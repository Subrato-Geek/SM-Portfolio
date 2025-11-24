import { useEffect, useRef, useState } from "react";
import { resumeHighlights } from "@/data/resume";
import { personalInfo } from "@/data/personal";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2 } from "lucide-react";

export const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="resume" ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Resume</span> Highlights
          </h2>

          <div className="bg-card border border-border rounded-xl p-8 md:p-12">
            <div className="space-y-6 mb-8">
              {resumeHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-8 border-t border-border">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white px-8"
                asChild
              >
                <a href={personalInfo.resumeUrl} download>
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
