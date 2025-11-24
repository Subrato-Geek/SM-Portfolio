import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { TextReveal } from "./TextReveal";
import { GradientTextReveal } from "./GradientTextReveal";

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const fullText = personalInfo.title;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background with Parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div 
          className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: "1s", transform: `translateY(${scrollY * 0.2}px)` }}
        />
      </div>

      {/* Content */}
      <div 
        className="container mx-auto px-6 relative z-10"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold">
            <TextReveal text="Hi, I'm " type="char" />{" "}
            <GradientTextReveal text={personalInfo.name} delay={0.3} />
          </h1>
          
          <div className="min-h-[80px] flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl font-medium text-muted-foreground">
              <TextReveal text={displayText} type="char" />
              <span className="inline-block w-1 h-8 md:h-10 bg-primary ml-1 animate-glow" />
            </h2>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            <TextReveal text={personalInfo.tagline} type="word" delay={0.5} />
          </p>

          <div className="flex flex-wrap sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white px-8"
              onClick={scrollToAbout}
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get In Touch
            </Button>
          </div>

          <div className="pt-12 animate-bounce">
            <ArrowDown className="w-6 h-6 mx-auto text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};
