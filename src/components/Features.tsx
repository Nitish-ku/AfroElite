import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Shield, 
  Clock, 
  Search, 
  Award, 
  BarChart3,
  FileText,
  Zap
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Writers",
    description: "Professional writers with expertise in various industries and niches.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Quality Guaranteed", 
    description: "Every piece goes through multiple quality checks and proofreading stages.",
    color: "text-secondary"
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Quick delivery without compromising on quality. Track progress in real-time.",
    color: "text-primary"
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Content optimized for search engines to improve your online visibility.",
    color: "text-secondary"
  },
  {
    icon: Award,
    title: "Satisfaction Guarantee",
    description: "Request revisions at any stage until you're completely satisfied.",
    color: "text-primary"
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "Monitor the impact of your content with detailed analytics and insights.",
    color: "text-secondary"
  }
];

const contentTypes = [
  { name: "Blog Articles", count: "50K+" },
  { name: "Web Copy", count: "30K+" },
  { name: "Product Descriptions", count: "100K+" },
  { name: "Social Media", count: "25K+" },
  { name: "Email Campaigns", count: "15K+" },
  { name: "Technical Writing", count: "10K+" }
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Professional Content Creation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We connect you with skilled writers who understand your industry and deliver 
            content that drives results for your business.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-muted ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Types */}
        <div className="bg-background rounded-2xl p-8 shadow-card">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <Badge variant="outline">Content Types</Badge>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Every Type of Content You Need
              </h3>
              <p className="text-muted-foreground mb-6">
                From blog posts to technical documentation, our writers cover all your content needs 
                with industry-specific expertise.
              </p>
              <div className="flex items-center space-x-2 text-primary">
                <Zap className="h-5 w-5" />
                <span className="font-medium">Fast, reliable, professional</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {contentTypes.map((type, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {type.count}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {type.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;