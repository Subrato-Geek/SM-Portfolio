import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/data/personal";
import { skills } from "@/data/skills";
import { Progress } from "@/components/ui/progress";
import { TextReveal } from "./TextReveal";
import { GradientTextReveal } from "./GradientTextReveal";

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [skillProgress, setSkillProgress] = useState<Record<string, number>>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill progress bars
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setSkillProgress(prev => ({ ...prev, [skill.name]: skill.level }));
            }, index * 100);
          });
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
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <TextReveal text="About " type="word" />{" "}
            <GradientTextReveal text="Me" delay={0.2} />
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-2xl opacity-30" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src="/subrato-maji.png"
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Bio & Skills */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  <TextReveal text="Hello There!" type="word" delay={0.3} />
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <TextReveal text={personalInfo.bio} type="word" delay={0.5} />
                </p>
              </div>

              <div className="space-y-6 hidden">
                <h4 className="text-xl font-semibold">
                  <TextReveal text="Skills & Technologies" type="word" delay={0.7} />
                </h4>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skillProgress[skill.name] || 0} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
