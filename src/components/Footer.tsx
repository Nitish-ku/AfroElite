import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/../public/logo.png";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
            <p className="text-muted-foreground text-sm">
              The leading platform for professional content creation, connecting businesses 
              with expert writers worldwide.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+33 4 80 16 10 08</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@contentpro.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services/blog-writing" className="hover:text-primary transition-smooth">Blog Writing</Link></li>
              <li><Link to="/services/web-copy" className="hover:text-primary transition-smooth">Web Copy</Link></li>
              <li><Link to="/services/product-descriptions" className="hover:text-primary transition-smooth">Product Descriptions</Link></li>
              <li><Link to="/services/social-media" className="hover:text-primary transition-smooth">Social Media Content</Link></li>
              <li><Link to="/services/technical-writing" className="hover:text-primary transition-smooth">Technical Writing</Link></li>
            </ul>
          </div>

          {/* For Writers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">For Writers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/writers/join" className="hover:text-primary transition-smooth">Join Our Team</Link></li>
              <li><Link to="/writers/requirements" className="hover:text-primary transition-smooth">Requirements</Link></li>
              <li><Link to="/writers/payment" className="hover:text-primary transition-smooth">Payment Terms</Link></li>
              <li><Link to="/writers/guidelines" className="hover:text-primary transition-smooth">Writing Guidelines</Link></li>
              <li><Link to="/writers/support" className="hover:text-primary transition-smooth">Writer Support</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-smooth">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-smooth">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-smooth">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-smooth">Blog</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-smooth">Help Center</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Write Flow. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;