import { useEffect, useState } from "react";

interface ThemeSplashProps {
  isActive: boolean;
  x: number;
  y: number;
  theme: string;
}

export const ThemeSplash = ({ isActive, x, y, theme }: ThemeSplashProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!show) return null;

  const isDark = theme === "dark";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{
        background: `radial-gradient(circle at ${x}px ${y}px, 
          ${isDark ? "hsl(var(--background))" : "hsl(var(--background))"} 0%, 
          transparent 0%)`,
        animation: "splash 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      }}
    />
  );
};
