import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  type?: "char" | "word";
}

export const  TextReveal = ({ 
  text, 
  className = "", 
  delay = 0,
  type = "char" 
}: TextRevealProps) => {
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

  const items = type === "char" ? text.split("") : text.split(" ");

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {items.map((item, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay + index * 0.03}s`,
          }}
        >
          {item === " " ? "\u00A0" : item}
          {type === "word" && index < items.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
};
