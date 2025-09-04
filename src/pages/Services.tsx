import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Globe, ShoppingCart, Mail, Code, Megaphone, Clock, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: FileText,
      title: "Blog Articles",
      description: "SEO-optimized blog posts that engage your audience and boost search rankings",
      features: ["Keyword research", "SEO optimization", "Engaging content", "Original writing"],
      price: "From $0.12/word"
    },
    {
      icon: Globe,
      title: "Web Copy",
      description: "Compelling website copy that converts visitors into customers",
      features: ["Landing pages", "About pages", "Service descriptions", "Call-to-action copy"],
      price: "From $0.15/word"
    },
    {
      icon: ShoppingCart,
      title: "Product Descriptions",
      description: "Persuasive product descriptions that drive sales and conversions",
      features: ["E-commerce copy", "Feature highlights", "Benefit-focused", "SEO-friendly"],
      price: "From $0.10/word"
    },
    {
      icon: Mail,
      title: "Email Campaigns",
      description: "High-converting email sequences that nurture leads and boost sales",
      features: ["Newsletter content", "Promotional emails", "Welcome sequences", "Drip campaigns"],
      price: "From $0.14/word"
    },
    {
      icon: Code,
      title: "Technical Writing",
      description: "Clear, comprehensive technical documentation and guides",
      features: ["API documentation", "User manuals", "Technical guides", "Software documentation"],
      price: "From $0.20/word"
    },
    {
      icon: Megaphone,
      title: "Social Media Content",
      description: "Engaging social media posts that build brand awareness and engagement",
      features: ["Platform-specific content", "Hashtag research", "Visual content ideas", "Consistent voice"],
      price: "From $0.08/word"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Services
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Professional Content Writing Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From blog posts to technical documentation, our expert writers deliver high-quality content that drives results for your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="shadow-elegant hover:shadow-xl transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {service.price}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground">{service.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/order">
                  <Button variant="outline" className="w-full">
                    Order Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-accent/30 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our Content Services?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine expertise, quality, and reliability to deliver content that exceeds expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your content delivered on time, every time, with our reliable deadline guarantee.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">100% original content with unlimited revisions until you're completely satisfied.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Writers</h3>
              <p className="text-muted-foreground">Work with professional writers who specialize in your industry and niche.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust us with their content needs. Get your custom quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order">
              <Button variant="hero" size="lg">
                Get Custom Quote
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;