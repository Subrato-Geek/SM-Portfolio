import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/stats";
import { Award, TrendingUp, Users, Zap } from "lucide-react";

const getIconForIndex = (index: number) => {
  const icons = [Award, Users, TrendingUp, Zap];
  return icons[index % icons.length];
};

const AnimatedCounter = ({ 
  end, 
  duration = 2000,
  suffix = "",
  prefix = "",
  isVisible 
}: { 
  end: number; 
  duration?: number;
  suffix?: string;
  prefix?: string;
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
};

export const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Achievements & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Milestones</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = getIconForIndex(index);
              return (
                <div
                  key={index}
                  className={`text-center group transition-all duration-700 delay-${index * 100} ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="mb-4 inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      isVisible={isVisible}
                    />
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
