import React from "react";

interface ShapeDividerProps {
  position?: "top" | "bottom";
  color?: string; // Tailwind fill class e.g. "fill-black" or "fill-white"
  className?: string;
  flip?: boolean;
}

export default function ShapeDivider({
  position = "top",
  color = "fill-black",
  className = "",
  flip = false,
}: ShapeDividerProps) {
  const isBottom = position === "bottom";

  return (
    <div
      aria-hidden="true"
      className={`absolute ${
        isBottom ? "bottom-0" : "top-0"
      } left-0 w-full overflow-hidden leading-none pointer-events-none z-10 ${
        flip || isBottom ? "rotate-180" : ""
      } ${className}`}
    >
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-[calc(100%+1.3px)] h-[55px] sm:h-[85px] lg:h-[120px]"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className={`${color} shape-fill transition-colors duration-300`}
        />
      </svg>
    </div>
  );
}
