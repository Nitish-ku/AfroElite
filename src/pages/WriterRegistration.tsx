import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Award, FileText, DollarSign, Shield, LogIn } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import teamImage from "@/assets/team-writers.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";

const WriterRegistration = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    portfolio: "",
    experience: "",
    specializations: [] as string[],
    bio: "",
    education: "",
    certifications: "",
    availability: "",
    acceptTerms: false
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(data.user);
        if (data.user?.email) {
          setFormData(prev => ({ ...prev, email: data.user.email! }));
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const specializations = [
    "Technology & Software", "Healthcare & Medical", "Finance & Banking", 
    "Travel & Tourism", "Fashion & Lifestyle", "Food & Beverage",
    "Real Estate", "Education & Training", "Automotive", "Sports & Fitness",
    "Marketing & Advertising", "Legal Services", "E-commerce", "Gaming"
  ];

  const experienceLevels = [
    { value: "beginner", label: "Beginner (0-2 years)" },
    { value: "intermediate", label: "Intermediate (2-5 years)" },
    { value: "experienced", label: "Experienced (5-10 years)" },
    { value: "expert", label: "Expert (10+ years)" }
  ];

  const handleSpecializationChange = (specialization: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specializations: checked 
        ? [...prev.specializations, specialization]
        : prev.specializations.filter(s => s !== specialization)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Authentication Error", description: "You must be logged in to apply.", variant: "destructive" });
      return;
    }
    setFormLoading(true);

    try {
      const { data, error } = await supabase.rpc('submit_writer_application', {
        p_user_id: user.id,
        p_first_name: formData.firstName,
        p_last_name: formData.lastName,
        p_availability: formData.availability,
        p_bio: formData.bio,
        p_certifications: formData.certifications.split(',').map(c => c.trim()),
        p_education: formData.education,
        p_experience: formData.experience,
        p_portfolio_url: formData.portfolio,
        p_specialization: formData.specializations,
        p_phone: formData.phone
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Thank you for applying. We will review your application and get back to you soon.",
      });
      navigate("/");

    } catch (error: any) {
      toast({
        title: "Application Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Join Our Team
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Become a Professional Writer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our platform and connect with clients who value quality content. 
            Set your own schedule and work on projects you're passionate about.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Benefits Section */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <img 
                  src={teamImage} 
                  alt="Team of professional writers" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Why Join Us?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-secondary" />
                    <span className="text-sm text-muted-foreground">Competitive rates</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-secondary" />
                    <span className="text-sm text-muted-foreground">Reliable payments</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-secondary" />
                    <span className="text-sm text-muted-foreground">Supportive community</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-secondary" />
                    <span className="text-sm text-muted-foreground">Diverse projects</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Requirements</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Native or fluent English</li>
                  <li>• Proven writing experience</li>
                  <li>• Portfolio of published work</li>
                  <li>• Ability to meet deadlines</li>
                  <li>• Professional communication</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Writer Application</CardTitle>
              </CardHeader>
              <CardContent>
                {!user ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-4">Please Log In to Apply</h3>
                    <p className="text-muted-foreground mb-6">You need to have an account to apply as a writer.</p>
                    <Link to="/auth">
                      <Button variant="hero">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login or Create Account
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          readOnly
                          className="bg-muted/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                        />
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio URL *</Label>
                      <Input
                        id="portfolio"
                        type="url"
                        placeholder="https://your-portfolio.com"
                        value={formData.portfolio}
                        onChange={(e) => setFormData(prev => ({...prev, portfolio: e.target.value}))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience Level *</Label>
                      <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({...prev, experience: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Specializations */}
                    <div className="space-y-3">
                      <Label>Specializations (select up to 5) *</Label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {specializations.map((spec) => (
                          <div key={spec} className="flex items-center space-x-2">
                            <Checkbox
                              id={spec}
                              checked={formData.specializations.includes(spec)}
                              onCheckedChange={(checked) => handleSpecializationChange(spec, checked as boolean)}
                            />
                            <Label htmlFor={spec} className="text-sm">
                              {spec}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio *</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about your writing background, expertise, and what makes you a great writer..."
                        className="min-h-32"
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        placeholder="e.g., Bachelor's in English Literature, University of Oxford"
                        value={formData.education}
                        onChange={(e) => setFormData(prev => ({...prev, education: e.target.value}))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certifications">Certifications & Achievements</Label>
                      <Textarea
                        id="certifications"
                        placeholder="List any relevant certifications, awards, or notable achievements..."
                        value={formData.certifications}
                        onChange={(e) => setFormData(prev => ({...prev, certifications: e.target.value}))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">Weekly Availability *</Label>
                      <Select value={formData.availability} onValueChange={(value) => setFormData(prev => ({...prev, availability: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="How many hours per week can you commit?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="part-time">Part-time (10-20 hours)</SelectItem>
                          <SelectItem value="regular">Regular (20-35 hours)</SelectItem>
                          <SelectItem value="full-time">Full-time (35+ hours)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Terms */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => setFormData(prev => ({...prev, acceptTerms: checked as boolean}))}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the Terms of Service and Privacy Policy *
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      disabled={!formData.acceptTerms || formLoading}
                    >
                      {formLoading ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WriterRegistration;