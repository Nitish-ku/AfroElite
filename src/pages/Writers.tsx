import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  DollarSign, 
  Clock, 
  Users, 
  Star, 
  TrendingUp, 
  Shield,
  Award,
  Target,
  Zap,
  Heart
} from "lucide-react";

const Writers = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Pay",
      description: "Earn $15-50+ per hour based on your expertise and project complexity",
      highlight: "Top writers earn $50+/hour"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work when you want, choose projects that interest you",
      highlight: "100% remote work"
    },
    {
      icon: Users,
      title: "Diverse Projects",
      description: "Write about topics you're passionate about across multiple industries",
      highlight: "50+ industries available"
    },
    {
      icon: Star,
      title: "Build Your Reputation",
      description: "Develop a strong profile and client reviews to increase your rates",
      highlight: "Performance-based bonuses"
    }
  ];

  const requirements = [
    "Native or near-native English proficiency",
    "Strong writing and research skills",
    "Ability to meet deadlines consistently",
    "Experience in at least one specialty area",
    "Portfolio of previous writing work",
    "Professional communication skills"
  ];

  const process = [
    {
      step: "1",
      title: "Apply",
      description: "Submit your application with portfolio samples and expertise areas"
    },
    {
      step: "2",
      title: "Assessment",
      description: "Complete a writing test in your chosen specialty areas"
    },
    {
      step: "3",
      title: "Review",
      description: "Our team reviews your application and test results"
    },
    {
      step: "4",
      title: "Onboarding",
      description: "Get approved and start receiving project invitations"
    }
  ];

  const stats = [
    { icon: Users, number: "500+", label: "Active Writers" },
    { icon: TrendingUp, number: "$2.5M+", label: "Paid to Writers" },
    { icon: Star, number: "4.8/5", label: "Average Rating" },
    { icon: Target, number: "98%", label: "On-time Delivery" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Join Our Team
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Become a Professional Content Writer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join hundreds of talented writers earning competitive rates while working on exciting projects for global clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/writers/join">
              <Button variant="hero" size="lg">
                Apply Now
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center shadow-card">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Writers Choose Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the support, flexibility, and compensation that professional writers deserve.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="shadow-elegant hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{benefit.title}</CardTitle>
                      <Badge variant="secondary" className="mb-3">
                        {benefit.highlight}
                      </Badge>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Writer Requirements
              </h2>
              <p className="text-muted-foreground mb-8">
                We maintain high standards to ensure quality content for our clients. Here's what we look for in our writers:
              </p>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="bg-primary/20 p-1 rounded-full mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
              <div className="text-center">
                <Award className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Expert Writer Program
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our top-performing writers enjoy premium rates, priority project access, and exclusive client relationships.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Premium rates:</span>
                    <Badge variant="default">$30-50+/hour</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Priority access:</span>
                    <Badge variant="default">High-value projects</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recognition:</span>
                    <Badge variant="default">Featured profile</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Simple Application Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in just a few steps. Most applications are reviewed within 2-3 business days.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-accent/30 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Our Writers Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "The platform gives me access to high-quality projects and fair compensation. I've been able to build long-term relationships with clients."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">SM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Sarah M.</div>
                    <div className="text-xs text-muted-foreground">Tech Writer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "I love the flexibility and variety of projects. The payment is always on time and the support team is incredibly helpful."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">DJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">David J.</div>
                    <div className="text-xs text-muted-foreground">Marketing Writer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "As a specialized healthcare writer, I appreciate having access to projects that match my expertise. The rates are very competitive."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">LR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Linda R.</div>
                    <div className="text-xs text-muted-foreground">Healthcare Writer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Writing Career?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of professional writers and start earning competitive rates for quality content creation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/writers/join">
              <Button variant="hero" size="lg">
                <Heart className="mr-2 h-5 w-5" />
                Apply to Join
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <Zap className="mr-2 h-5 w-5" />
              Download Writer Guide
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Writers;