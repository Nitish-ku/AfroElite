import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, DollarSign, Shield, Upload } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const OrderForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    contentType: "",
    wordCount: "",
    topic: "",
    description: "",
    deadline: "",
    expertise: "",
    keywords: ""
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);
  const { toast } = useToast();

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const contentTypes = [
    { value: "blog_post", label: "Blog Article", basePrice: 0.12 },
    { value: "web_copy", label: "Web Copy", basePrice: 0.15 },
    { value: "other", label: "Product Description", basePrice: 0.10 },
    { value: "other", label: "Social Media Content", basePrice: 0.08 },
    { value: "other", label: "Technical Writing", basePrice: 0.20 },
    { value: "other", label: "Email Campaign", basePrice: 0.14 }
  ];

  const expertiseDomains = [
    "Technology", "Healthcare", "Finance", "Travel", "Fashion", 
    "Food & Beverage", "Real Estate", "Education", "Automotive", "Sports"
  ];

  const calculatePrice = (type: string, words: string) => {
    const contentType = contentTypes.find(ct => ct.value === type);
    if (contentType && words) {
      const wordCount = parseInt(words);
      if (!isNaN(wordCount)) {
        const basePrice = contentType.basePrice * wordCount;
        const rushFee = formData.deadline === "24h" ? basePrice * 0.5 : 
                       formData.deadline === "48h" ? basePrice * 0.3 : 0;
        setEstimatedPrice(basePrice + rushFee);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    if (field === "contentType" || field === "wordCount" || field === "deadline") {
      calculatePrice(
        field === "contentType" ? value : newFormData.contentType,
        field === "wordCount" ? value : newFormData.wordCount
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const getDeadlineDate = (deadline: string): Date | null => {
    if (!deadline) return null;
    const now = new Date();
    if (deadline.endsWith('h')) {
      const hours = parseInt(deadline.replace('h', ''));
      now.setHours(now.getHours() + hours);
    } else if (deadline.endsWith('d')) {
      const days = parseInt(deadline.replace('d', ''));
      now.setDate(now.getDate() + days);
    }
    return now;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.contentType === "" || !formData.wordCount) {
      toast({
        title: "Incomplete Form",
        description: "Please select a content type and enter a word count.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const deadlineDate = getDeadlineDate(formData.deadline);

    try {
      let authUser = (await supabase.auth.getUser()).data.user;
      if (!authUser) {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
        authUser = data.user;
      }
      if (!authUser) throw new Error("Could not authenticate user for file upload.");

      const payload = {
        p_email: formData.email,
        p_content_type: formData.contentType,
        p_word_count: parseInt(formData.wordCount),
        p_title: formData.topic,
        p_description: formData.description,
        p_deadline: deadlineDate ? deadlineDate.toISOString() : null,
        p_client_price: estimatedPrice,
        p_expertise: formData.expertise,
        p_keywords: formData.keywords.split(',').map(k => k.trim())
      };

      const { data, error } = await supabase.rpc('submit_anonymous_order', payload);

      if (error) {
        throw new Error(error.message);
      }

      if (!data?.ok) {
        throw new Error('Order creation failed unexpectedly');
      }

      const orderData = data.order_id; // Extract order_id from the new response format

      if (file && orderData) {
        const filePath = `${authUser.id}/${orderData}/${file.name}`;
        const { error: uploadError } = await supabase.storage.from('order_files').upload(filePath, file);

        if (uploadError) throw uploadError;

        const { error: fileError } = await supabase.rpc('add_order_file', {
          p_order_id: orderData,
          p_user_id: authUser.id,
          p_file_path: filePath,
          p_file_name: file.name,
          p_file_type: file.type
        });

        if (fileError) throw fileError;
      }

      toast({
        title: "Order Submitted!",
        description: "Your order has been placed successfully. We will contact you shortly.",
      });
      // Reset form
      setFormData({ email: "", contentType: "", wordCount: "", topic: "", description: "", deadline: "", expertise: "", keywords: "" });
      setFile(null);
      setEstimatedPrice(0);
      setSubmittedOrder(orderData);

    } catch (error: any) {
      toast({
        title: "Error Submitting Order",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe.js has not loaded yet.");
      }

      const { data, error: functionError } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          order_id: submittedOrder,
          client_email: formData.email,
          client_price: estimatedPrice,
          title: formData.topic,
        },
      });

      if (functionError) {
        throw functionError;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

      if (error) {
        toast({ title: 'Error redirecting to checkout', description: error.message, variant: 'destructive' });
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "An unexpected error occurred during payment processing.",
        variant: "destructive",
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Place Your Order</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Get Your Custom Content Quote</h1>
          <p className="text-xl text-muted-foreground">Tell us about your project and we'll match you with the perfect writer</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader><CardTitle className="flex items-center space-x-2"><FileText className="h-5 w-5 text-primary" /><span>Project Details</span></CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-2"><Label htmlFor="email">Your Email Address *</Label><Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="contentType">Content Type *</Label><Select value={formData.contentType} onValueChange={(value) => handleInputChange("contentType", value)}><SelectTrigger><SelectValue placeholder="Select content type" /></SelectTrigger><SelectContent>{contentTypes.map((type) => (<SelectItem key={type.label} value={type.value}>{type.label}</SelectItem>))}</SelectContent></Select></div>
                  <div className="space-y-2"><Label htmlFor="wordCount">Word Count *</Label><Input id="wordCount" type="number" placeholder="e.g., 1000" value={formData.wordCount} onChange={(e) => handleInputChange("wordCount", e.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="topic">Topic/Title *</Label><Input id="topic" placeholder="e.g., Benefits of Cloud Computing for Small Businesses" value={formData.topic} onChange={(e) => handleInputChange("topic", e.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="description">Project Description *</Label><Textarea id="description" placeholder="Describe your content requirements, target audience, tone, and any specific guidelines..." className="min-h-32" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="deadline">Deadline</Label><Select value={formData.deadline} onValueChange={(value) => handleInputChange("deadline", value)}><SelectTrigger><SelectValue placeholder="Select deadline" /></SelectTrigger><SelectContent><SelectItem value="24h">24 Hours (+50%)</SelectItem><SelectItem value="48h">48 Hours (+30%)</SelectItem><SelectItem value="3d">3 Days</SelectItem><SelectItem value="7d">7 Days</SelectItem><SelectItem value="14d">14 Days</SelectItem></SelectContent></Select></div>
                  <div className="space-y-2"><Label htmlFor="expertise">Expertise Domain</Label><Select value={formData.expertise} onValueChange={(value) => handleInputChange("expertise", value)}><SelectTrigger><SelectValue placeholder="Select domain (optional)" /></SelectTrigger><SelectContent>{expertiseDomains.map((domain) => (<SelectItem key={domain} value={domain.toLowerCase()}>{domain}</SelectItem>))}</SelectContent></Select></div>
                  <div className="space-y-2"><Label htmlFor="keywords">Target Keywords</Label><Input id="keywords" placeholder="e.g., cloud computing, small business, digital transformation" value={formData.keywords} onChange={(e) => handleInputChange("keywords", e.target.value)} /></div>
                  
                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="file">Attach Files</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="file" type="file" onChange={handleFileChange} className="flex-1" />
                      <Button type="button" variant="outline" size="icon"><Upload className="h-4 w-4" /></Button>
                    </div>
                    {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
                  </div>

                  {!submittedOrder && (
                                        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>{loading ? "Submitting..." : "Submit Order"}</Button>
                  )}
                  {submittedOrder && (
                                        <Button type="button" variant="secondary" size="lg" className="w-full" onClick={handlePayment} disabled={paymentLoading}>
                      {paymentLoading ? "Processing..." : "Proceed to Payment"}
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader><CardTitle className="flex items-center space-x-2"><DollarSign className="h-5 w-5 text-secondary" /><span>Order Summary</span></CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-muted-foreground">Content Type:</span><span className="font-medium">{formData.contentType ? contentTypes.find(ct => ct.value === formData.contentType)?.label : "-"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Word Count:</span><span className="font-medium">{formData.wordCount || "-"} words</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Deadline:</span><span className="font-medium">{formData.deadline ? formData.deadline.replace(/[hd]/g, match => match === 'h' ? ' hours' : ' days') : "-"}</span></div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center"><span className="text-lg font-semibold">Estimated Price:</span><span className="text-2xl font-bold text-primary">${estimatedPrice.toFixed(2)}</span></div>
                  <p className="text-xs text-muted-foreground mt-2">Final price may vary based on complexity</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3"><Shield className="h-5 w-5 text-primary" /><span className="font-medium">Quality Guarantee</span></div>
                <div className="flex items-center space-x-3"><Clock className="h-5 w-5 text-primary" /><span className="font-medium">On-Time Delivery</span></div>
                <div className="flex items-center space-x-3"><FileText className="h-5 w-5 text-primary" /><span className="font-medium">Unlimited Revisions</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderForm;