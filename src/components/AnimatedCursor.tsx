import { useEffect, useRef, useState } from "react";

export const AnimatedCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorOutline = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (cursorDot.current && cursorOutline.current) {
        cursorDot.current.style.left = `${position.current.x}px`;
        cursorDot.current.style.top = `${position.current.y}px`;
        cursorOutline.current.style.left = `${position.current.x}px`;
        cursorOutline.current.style.top = `${position.current.y}px`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    const updateCursor = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY };
      
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button'], input, textarea");
      setIsPointer(!!isClickable);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    rafId.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", updateCursor, { passive: true });
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener("mousemove", updateCursor);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorDot}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          transform: `translate(-50%, -50%) scale(${isPointer ? 0.5 : 1})`,
          backgroundColor: "hsl(var(--primary))",
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      />
      
      {/* Cursor outline */}
      <div
        ref={cursorOutline}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9998] border-2 transition-all duration-300"
        style={{
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
          borderColor: "hsl(var(--primary) / 0.5)",
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      />
    </>
  );
};
