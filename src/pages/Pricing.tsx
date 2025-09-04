import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Clock, Zap, Crown } from "lucide-react";

const Pricing = () => {
  const contentTypes = [
    {
      type: "Blog Articles",
      price: 0.12,
      description: "SEO-optimized blog posts",
      features: ["Keyword research", "SEO optimization", "Engaging content", "Meta descriptions"]
    },
    {
      type: "Web Copy",
      price: 0.15,
      description: "Converting website content",
      features: ["Landing pages", "About pages", "Service descriptions", "CTA optimization"]
    },
    {
      type: "Product Descriptions",
      price: 0.10,
      description: "E-commerce product copy",
      features: ["Feature highlights", "Benefit-focused", "SEO-friendly", "Conversion optimized"]
    },
    {
      type: "Social Media Content",
      price: 0.08,
      description: "Engaging social posts",
      features: ["Platform-specific", "Hashtag research", "Visual ideas", "Consistent voice"]
    },
    {
      type: "Technical Writing",
      price: 0.20,
      description: "Complex technical content",
      features: ["API documentation", "User manuals", "Technical guides", "Clear explanations"]
    },
    {
      type: "Email Campaigns",
      price: 0.14,
      description: "High-converting emails",
      features: ["Newsletter content", "Promotional emails", "Sequences", "Personalization"]
    }
  ];

  const urgencyPricing = [
    {
      icon: Clock,
      title: "Standard",
      timeline: "7-14 days",
      multiplier: "Base Price",
      description: "Perfect for planned content",
      popular: false
    },
    {
      icon: Zap,
      title: "Express",
      timeline: "3-5 days",
      multiplier: "+30%",
      description: "Faster delivery guaranteed",
      popular: true
    },
    {
      icon: Crown,
      title: "Rush",
      timeline: "24-48 hours",
      multiplier: "+50%",
      description: "Priority handling",
      popular: false
    }
  ];

  const calculatePrice = (basePrice: number, words: number, multiplier: string) => {
    const base = basePrice * words;
    if (multiplier === "+30%") return base * 1.3;
    if (multiplier === "+50%") return base * 1.5;
    return base;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Transparent Pricing
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple, Fair Pricing for Quality Content
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No hidden fees, no surprises. Pay per word with competitive rates and volume discounts available.
          </p>
        </div>

        {/* Content Type Pricing */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Pricing by Content Type</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentTypes.map((content, index) => (
              <Card key={index} className="shadow-elegant hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{content.type}</CardTitle>
                    <Badge variant="secondary" className="font-bold">
                      ${content.price}/word
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{content.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {content.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-accent/30 p-3 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">1000 words</div>
                    <div className="text-xl font-bold text-primary">
                      ${(content.price * 1000).toFixed(0)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Urgency Pricing */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Delivery Speed Options</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {urgencyPricing.map((option, index) => (
              <Card key={index} className={`shadow-elegant hover:shadow-xl transition-all duration-300 ${option.popular ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <option.icon className="h-6 w-6 text-primary" />
                    </div>
                    {option.popular && (
                      <Badge variant="default">Most Popular</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <div className="text-2xl font-bold text-primary">{option.multiplier}</div>
                  <p className="text-muted-foreground">{option.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-lg font-semibold">{option.timeline}</div>
                    <div className="text-sm text-muted-foreground">Delivery time</div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Blog (1000 words)</span>
                      <span className="font-semibold">${calculatePrice(0.12, 1000, option.multiplier).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Web Copy (500 words)</span>
                      <span className="font-semibold">${calculatePrice(0.15, 500, option.multiplier).toFixed(0)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Volume Discounts */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Volume Discounts Available
            </h2>
            <p className="text-muted-foreground">
              Save more when you order larger projects or become a regular client
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center bg-background/50 rounded-lg p-6">
              <div className="text-2xl font-bold text-primary mb-2">5%</div>
              <div className="font-semibold mb-1">5,000+ words</div>
              <div className="text-sm text-muted-foreground">Single project discount</div>
            </div>
            <div className="text-center bg-background/50 rounded-lg p-6">
              <div className="text-2xl font-bold text-primary mb-2">10%</div>
              <div className="font-semibold mb-1">10,000+ words</div>
              <div className="text-sm text-muted-foreground">Large project discount</div>
            </div>
            <div className="text-center bg-background/50 rounded-lg p-6">
              <div className="text-2xl font-bold text-primary mb-2">15%</div>
              <div className="font-semibold mb-1">Monthly Plans</div>
              <div className="text-sm text-muted-foreground">Regular client discount</div>
            </div>
          </div>
        </div>

        {/* Guarantees */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Our Guarantees
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">100% original content with unlimited revisions until satisfied</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">On-Time Delivery</h3>
              <p className="text-muted-foreground">Your content delivered exactly when promised, every time</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Money Back</h3>
              <p className="text-muted-foreground">Not satisfied? Get your money back, no questions asked</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get an instant quote for your project. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order">
              <Button variant="hero" size="lg">
                Get Instant Quote
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;