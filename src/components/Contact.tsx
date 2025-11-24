import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/data/personal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Github, Linkedin, Twitter, Dribbble } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  dribbble: Dribbble,
};

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Get In <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{personalInfo.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{personalInfo.phone}</div>
                  </div>
                </a>
              </div>

              {/* Social Media */}
              <div className="pt-8">
                <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {Object.entries(personalInfo.social).map(([platform, url]) => {
                    const Icon = socialIcons[platform as keyof typeof socialIcons];
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all hover:scale-110"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="bg-background border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
