// Projects data - Edit this file to change your portfolio projects

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "CallOnDoc – Online Doctor Consultation Platform",
    description:
      "Developed responsive user interfaces for an online doctor consultation platform. Implemented complete patient and consultation flows, enhanced cross-browser compatibility, optimized UI performance, and resolved client-side issues to improve accessibility and user experience.",
    image: "/CallOnDoc.png",
    technologies: [
      "HTML5",
      "CSS3",
      "SCSS",
      "JavaScript (ES6)",
      "ReactJs",
      "jQuery",
      "Bootstrap",
      "Laravel",
      "Responsive Design",
      "Cross-Browser Compatibility"
    ],
    liveUrl: "https://www.callondoc.com/en/consultation",
    githubUrl: ""
  },
  {
    id: "2",
    title: "MediaTrooper – Entertainment & Digital Media Platform",
    description:
      "Enhanced and maintained the front-end interface for MediaTrooper, a digital media and live entertainment platform. Improved UI performance, optimized components for high-traffic pages, ensured responsiveness across devices, and resolved UI/UX issues to deliver a polished user experience.",
    image: "/MediaTroopers.png",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "WordPress",
      "Responsive UI",
      "Cross-Browser Testing",
      "Performance Optimization"
    ],
    liveUrl: "https://www.media-troopers.com/",
    githubUrl: ""
  },
  {
    id: "3",
    title: "React Social Media Application",
    description:
      "Developed a full-featured social media application with user authentication, session persistence, post creation, saving, archiving, deletion, and a modern responsive UI. Implemented component-based architecture and React hooks for seamless state management.",
    image: "/social-app.svg",
    technologies: [
      "ReactJS",
      "Tailwind CSS",
      "JavaScript (ES6)",
      "LocalStorage",
      "Responsive Design",
      "React Hooks",
      "Component Architecture"
    ],
    liveUrl: "",
    githubUrl: ""
  },
  {
    id: "4",
    title: "AI Chatbot Plugin for Websites",
    description:
      "Developed a customizable AI chatbot plugin that integrates seamlessly into any website. Features include theme customization, floating widget styling, dynamic positioning, responsive behavior, and cross-platform compatibility.",
    image: "/chatbot.svg",
    technologies: [
      "JavaScript",
      "jQuery",
      "HTML",
      "CSS",
      "DOM Manipulation",
      "Plugin Architecture",
      "UX Enhancements"
    ],
    liveUrl: "",
    githubUrl: ""
  }
];
