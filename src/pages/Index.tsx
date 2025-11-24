import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Stats } from "@/components/Stats";
import { Timeline } from "@/components/Timeline";
import { Projects } from "@/components/Projects";
import { Resume } from "@/components/Resume";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { AnimatedCursor } from "@/components/AnimatedCursor";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AnimatedCursor />
      <ScrollProgress />
      <Header />
      <Hero />
      <About />
      <Stats />
      <Timeline />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
