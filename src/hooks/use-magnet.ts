import { useEffect, useRef } from "react";

export const useMagnet = (strength: number = 0.3) => {
  const ref = useRef<HTMLElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();
  const targetPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isHovering = false;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      if (!element || !isHovering) return;

      position.current.x = lerp(position.current.x, targetPosition.current.x, 0.15);
      position.current.y = lerp(position.current.y, targetPosition.current.y, 0.15);

      element.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;

      rafId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = rect.width * 1.5;
      
      if (distance < maxDistance) {
        isHovering = true;
        targetPosition.current = {
          x: deltaX * strength,
          y: deltaY * strength,
        };
        
        if (!rafId.current) {
          rafId.current = requestAnimationFrame(animate);
        }
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetPosition.current = { x: 0, y: 0 };
      
      const resetAnimation = () => {
        position.current.x = lerp(position.current.x, 0, 0.15);
        position.current.y = lerp(position.current.y, 0, 0.15);
        
        if (element) {
          element.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
        }
        
        if (Math.abs(position.current.x) > 0.1 || Math.abs(position.current.y) > 0.1) {
          requestAnimationFrame(resetAnimation);
        }
      };
      
      requestAnimationFrame(resetAnimation);
    };

    element.addEventListener("mousemove", handleMouseMove, { passive: true });
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return { ref };
};
