import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Users, 
  Edit, 
  CheckCircle, 
  MessageSquare,
  ArrowRight
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "1",
    title: "Place Your Order",
    description: "Tell us about your content needs, target audience, and requirements. Get an instant quote.",
    status: "order"
  },
  {
    icon: Users,
    step: "2", 
    title: "Writer Assignment",
    description: "We match you with the perfect writer based on your industry and content type.",
    status: "writing"
  },
  {
    icon: Edit,
    step: "3",
    title: "Writing & Review",
    description: "Your content is written and goes through our quality assurance process.",
    status: "proofreading"
  },
  {
    icon: CheckCircle,
    step: "4",
    title: "Delivery & Approval",
    description: "Receive your completed content and request revisions if needed.",
    status: "completed"
  }
];

const OrderProcess = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Simple 4-Step Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From order to delivery, we keep you informed at every stage. Track your content's 
            progress and request changes whenever needed.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full border-0 shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Real-time Updates */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
                <Badge variant="outline">Real-time Updates</Badge>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Stay Informed Every Step
              </h3>
              <p className="text-muted-foreground mb-6">
                Track your order status in real-time. Get notifications when your content 
                moves to the next stage and request changes at any point in the process.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-sm text-foreground">Writing in progress...</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Quality review completed</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-foreground">Ready for delivery</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="border-0 shadow-card">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-3">Anonymous & Secure</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    Your identity remains protected with automatically assigned IDs. 
                    Only our admin manages pricing and writer assignments.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    ID: CL-2024-001
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-card">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-3">Request Changes</h4>
                  <p className="text-muted-foreground text-sm">
                    Not satisfied? Request revisions at any stage until the content 
                    meets your exact requirements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/order">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Start Your Order Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderProcess;