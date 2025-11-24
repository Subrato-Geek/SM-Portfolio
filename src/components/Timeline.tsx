import { useEffect, useRef, useState } from "react";
import { timeline } from "@/data/timeline";
import { Briefcase, GraduationCap, Code, Rocket, Award } from "lucide-react";

const getIconForIndex = (index: number) => {
  const icons = [Rocket, Code, Briefcase, GraduationCap, Award];
  return icons[index % icons.length];
};

export const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = timeline.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        },
        { threshold: 0.2 }
      );

      if (itemRefs.current[index]) {
        observer.observe(itemRefs.current[index]!);
      }

      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section id="timeline" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Journey</span>
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const Icon = getIconForIndex(index);
                return (
                  <div
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className={`relative transition-all duration-700 ${
                      visibleItems.has(index) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                    }`}
                  >
                    <div className="flex items-start gap-8 md:gap-0">
                      {/* Timeline Dot with Icon */}
                      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 group">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-4 border-background shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-primary/50">
                          <Icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="ml-20 md:ml-0 md:w-1/2 md:pr-12 md:text-right md:even:ml-auto md:even:pl-12 md:even:pr-0 md:even:text-left">
                        <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:-translate-y-2 hover:bg-card-hover">
                          <div className="flex items-center gap-2 mb-3 md:justify-end md:even:justify-start">
                            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                              <span className="text-sm text-primary font-semibold">{item.year}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.role}</h3>
                          <h4 className="text-accent font-semibold mb-3 flex items-center gap-2 md:justify-end md:even:justify-start">
                            <Briefcase className="w-4 h-4" />
                            {item.company}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
