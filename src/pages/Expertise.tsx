import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Laptop, 
  Heart, 
  DollarSign, 
  Plane, 
  Shirt, 
  UtensilsCrossed, 
  Home, 
  GraduationCap, 
  Car, 
  Trophy,
  Building,
  Stethoscope,
  Briefcase,
  Camera
} from "lucide-react";

const Expertise = () => {
  const expertiseDomains = [
    {
      icon: Laptop,
      title: "Technology",
      description: "Software, AI, cybersecurity, blockchain, and emerging tech trends",
      specialties: ["Software Development", "AI & Machine Learning", "Cybersecurity", "Cloud Computing", "Mobile Apps"],
      writers: 45
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "Medical content, wellness, pharmaceutical, and health technology",
      specialties: ["Medical Writing", "Pharmaceutical", "Mental Health", "Fitness & Wellness", "Healthcare Tech"],
      writers: 32
    },
    {
      icon: DollarSign,
      title: "Finance",
      description: "Banking, investments, cryptocurrency, fintech, and financial planning",
      specialties: ["Investment Analysis", "Cryptocurrency", "Personal Finance", "Banking", "Insurance"],
      writers: 28
    },
    {
      icon: Plane,
      title: "Travel",
      description: "Tourism, hospitality, travel guides, and destination content",
      specialties: ["Destination Guides", "Hotel Reviews", "Travel Tips", "Cultural Content", "Adventure Travel"],
      writers: 38
    },
    {
      icon: Shirt,
      title: "Fashion",
      description: "Fashion trends, style guides, beauty, and lifestyle content",
      specialties: ["Fashion Trends", "Style Guides", "Beauty Reviews", "Sustainable Fashion", "Luxury Brands"],
      writers: 25
    },
    {
      icon: UtensilsCrossed,
      title: "Food & Beverage",
      description: "Culinary content, recipes, restaurant reviews, and food industry",
      specialties: ["Recipe Development", "Restaurant Reviews", "Food Trends", "Nutrition", "Beverage Industry"],
      writers: 35
    },
    {
      icon: Home,
      title: "Real Estate",
      description: "Property investment, home buying guides, and real estate trends",
      specialties: ["Property Investment", "Home Buying", "Market Analysis", "Interior Design", "Property Management"],
      writers: 22
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Educational content, e-learning, academic writing, and training materials",
      specialties: ["E-learning Content", "Academic Writing", "Educational Technology", "Training Materials", "Curriculum Development"],
      writers: 41
    },
    {
      icon: Car,
      title: "Automotive",
      description: "Car reviews, automotive technology, and transportation industry",
      specialties: ["Car Reviews", "Electric Vehicles", "Auto Technology", "Transportation", "Automotive News"],
      writers: 19
    },
    {
      icon: Trophy,
      title: "Sports",
      description: "Sports news, fitness, athletics, and recreational activities",
      specialties: ["Sports News", "Fitness Training", "Athletic Performance", "Sports Equipment", "Recreational Activities"],
      writers: 33
    },
    {
      icon: Building,
      title: "Business",
      description: "Entrepreneurship, management, marketing, and corporate content",
      specialties: ["Business Strategy", "Marketing", "Leadership", "Entrepreneurship", "Corporate Communications"],
      writers: 52
    },
    {
      icon: Camera,
      title: "Entertainment",
      description: "Movies, music, gaming, and entertainment industry content",
      specialties: ["Movie Reviews", "Music Industry", "Gaming", "Celebrity News", "Entertainment Technology"],
      writers: 29
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Expertise Domains
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Industry Specialists at Your Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our writers are experts in their fields, ensuring your content is accurate, engaging, and authoritative across all industries.
          </p>
        </div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {expertiseDomains.map((domain, index) => (
            <Card key={index} className="shadow-elegant hover:shadow-xl transition-all duration-300 border-border/50 group">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <domain.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">
                    {domain.writers} writers
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {domain.title}
                </CardTitle>
                <p className="text-muted-foreground text-sm">{domain.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-sm text-foreground">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {domain.specialties.slice(0, 3).map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {domain.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{domain.specialties.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <Link to="/order">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    Find Writers
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our expert writers have created content for companies across all major industries.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Expert Writers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Industries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10k+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Work with Industry Experts?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with writers who understand your industry inside and out. Get content that speaks your audience's language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order">
              <Button variant="hero" size="lg">
                Find Your Expert Writer
              </Button>
            </Link>
            <Link to="/writers/join">
              <Button variant="outline" size="lg">
                Become a Writer
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Expertise;