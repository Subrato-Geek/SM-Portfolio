import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = projects.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleProjects((prev) => new Set(prev).add(index));
          }
        },
        { threshold: 0.1 }
      );

      if (projectRefs.current[index]) {
        observer.observe(projectRefs.current[index]!);
      }

      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                className={`group transition-all duration-700 ${
                  visibleProjects.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                  {/* Project Image */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Project Details */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-secondary/50 hover:bg-secondary/70 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary text-primary hover:bg-primary/10 flex-1"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-accent text-accent hover:bg-accent/10 flex-1"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
