// src/RectanglesGrid.jsx
import React, { useEffect, useState, useRef } from "react";
import Rectangle from "./Rectangles";

const RectanglesGrid = () => {
  const gridSize = { width: 450, height: 444 }; // Adjust grid size as needed
  const gridRef = useRef(null);
  const [isGridInView, setIsGridInView] = useState(false);

  useEffect(() => {
    const gridElement = gridRef.current;

    if (!gridElement) return;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Grid is in viewport
          setIsGridInView(true);
        } else {
          // Grid has left the viewport
          setIsGridInView(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // Adjust threshold as needed
    });

    observer.observe(gridElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Define the properties for the rectangles
  const rectanglesData = [
    {
      id: 1,
      initialPosition: { x: 500, y: -50 },
      finalPosition: { x: 0, y: 0 },
      size: { width: 45, height: 444 },
      borderColor: "border-[rgba(140,146,116)]",
      rotationDuration: 2,
      moveDuration: 1,
    },
    {
      id: 2,
      initialPosition: { x: 130, y: 210 },
      finalPosition: { x: 48, y: 0 },
      size: { width: 45, height: 444 },
      borderColor: "border-[rgba(140,146,116)]",
      rotationDuration: 1,
      moveDuration: 2,
    },
    {
      id: 3,
      initialPosition: { x: 200, y: 400 },
      finalPosition: { x: 96, y: 0 },
      size: { width: 100, height: 146 },
      borderColor: "border-[rgba(140,146,116)]",
      rotationDuration: 1,
      moveDuration: 2,
    },
    {
      id: 4,
      initialPosition: { x: 300, y: 20 },
      finalPosition: { x: 96, y: 149 },
      size: { width: 100, height: 146 },
      borderColor: "border-[rgba(140,146,116)]",
      rotationDuration: 1,
      moveDuration: 2,
    },
    {
      id: 5,
      initialPosition: { x: 0, y: 0 },
      finalPosition: { x: 96, y: 298 },
      size: { width: 100, height: 146 },
      borderColor: "border-[rgba(140,146,116)]",
      rotationDuration: 1,
      moveDuration: 1.8,
    },
    {
      id: 6,
      initialPosition: { x: 320, y: 150 },
      finalPosition: { x: 199, y: 0 },
      size: { width: 100, height: 221 },
      borderColor: "border-[rgba(140,146,116)]",
      rotationDuration: 1,
      moveDuration: 2,
    },
    {
      id: 7,
      initialPosition: { x: 400, y: 250 },
      finalPosition: { x: 199, y: 224 },
      size: { width: 100, height: 220 },
      borderColor: "border-[rgba(140,146,116)]",
      rotationDuration: 1,
      moveDuration: 2,
    },
    {
      id: 8,
      initialPosition: { x: 100, y: -100 },
      finalPosition: { x: 302, y: 0 },
      size: { width: 100, height: 444 },
      borderColor: "border-[rgba(140,146,116)]",
      rotationDuration: 1,
      moveDuration: 2,
    },
  ];

  return (
    <div
      ref={gridRef}
      className="relative"
      style={{
        width: `${gridSize.width}px`,
        height: `${gridSize.height}px`,
      }}
    >
      {rectanglesData.map((rect) => (
        <Rectangle
          key={rect.id}
          text={rect.text}
          initialPosition={rect.initialPosition}
          finalPosition={rect.finalPosition}
          size={rect.size}
          borderColor={rect.borderColor}
          rotationDuration={rect.rotationDuration}
          moveDuration={rect.moveDuration}
          style={{ zIndex: rect.zIndex }}
          isGridInView={isGridInView}
        />
      ))}
    </div>
  );
};

export default RectanglesGrid;
