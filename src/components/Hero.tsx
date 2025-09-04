import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Search } from "lucide-react";
import heroImage from "@/assets/hero-writer.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                #1 Content Writing Platform
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Premium
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Content Writing </span>
                Platform
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Your complete solution for high-quality content, written by expert writers at competitive rates.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/order">
                <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                  Get Custom Quote
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  View Pricing
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2 text-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-medium">100% Human</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground">
                <Search className="h-5 w-5 text-primary" />
                <span className="font-medium">SEO Optimized</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Professional content writer at work"
                className="rounded-2xl shadow-elegant w-full h-auto"
              />
              {/* Stats Badge */}
              <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-2xl p-6 shadow-card">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">230,000+</div>
                    <div className="text-sm text-muted-foreground">Content Pieces</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-2xl transform rotate-3 scale-105"></div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 pt-12 border-t border-border">
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              We work with more than <span className="font-semibold text-foreground">6,000+ agencies and websites</span>
            </p>
            <div className="flex justify-center items-center mt-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-secondary rounded-full"></div>
                ))}
              </div>
              <span className="ml-2 text-lg font-semibold text-foreground">4.9/5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;