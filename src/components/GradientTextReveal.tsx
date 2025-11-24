import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GradientTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const GradientTextReveal = ({ 
  text, 
  className = "", 
  delay = 0 
}: GradientTextRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.8)",
                transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay + (wordIndex * word.length + charIndex) * 0.02}s`,
                backgroundSize: "200% auto",
                animation: isVisible ? "gradient-shift 3s ease infinite" : "none",
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};
