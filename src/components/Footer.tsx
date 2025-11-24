import { useEffect, useState } from "react";
import { personalInfo } from "@/data/personal";
import { Heart } from "lucide-react";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {personalInfo.name}
            </div>
            
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
