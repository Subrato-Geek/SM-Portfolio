import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  type?: "char" | "word";
}

export const TextReveal = ({
  text,
  className = "",
  delay = 0,
  type = "char",
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

  // ✅ WORD MODE (if you ever use it)
  if (type === "word") {
    const words = text.split(" ");

    return (
      <span ref={ref} className={cn("inline-block", className)}>
        {words.map((word, index) => (
          <span
            key={index}
            className="inline-block mr-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${
                delay + index * 0.08
              }s`,
            }}
          >
            {word}
          </span>
        ))}
      </span>
    );
  }

  // ✅ CHAR MODE – grouped by word, with spacing using margin
  const words = text.split(" ");
  let globalIndex = 0;

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-block mr-2" // <-- this is your "space"
        >
          {word.split("").map((char, charIdx) => {
            const index = globalIndex++;
            return (
              <span
                key={charIdx}
                className="inline-block"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${
                    delay + index * 0.03
                  }s`,
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};
