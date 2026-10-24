// src/Rectangle.jsx
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../../src/index.css"; // Adjust the path if necessary

const Rectangle = ({
  text = "",
  initialPosition,
  finalPosition,
  size,
  borderColor,
  rotationDuration,
  moveDuration,
  style = {},
  isGridInView,
}) => {
  const rectangleRef = useRef(null);

  // Calculate total duration
  const totalDuration = rotationDuration + moveDuration;

  // Calculate the delta for transforms
  const deltaX = initialPosition.x - finalPosition.x;
  const deltaY = initialPosition.y - finalPosition.y;

  useEffect(() => {
    const rectangleElement = rectangleRef.current;
    if (!rectangleElement) return;

    if (isGridInView) {
      // Trigger animation by adding 'animate' class
      rectangleElement.classList.add("animate");
    } else {
      // Remove animation class
      rectangleElement.classList.remove("animate");
    }
  }, [isGridInView]);

  // Apply CSS variables and classes
  const styleProps = {
    top: `${finalPosition.y}px`,
    left: `${finalPosition.x}px`,
    "--delta-x": `${deltaX}px`,
    "--delta-y": `${deltaY}px`,
    "--rotation-duration": `${rotationDuration}s`,
    "--move-duration": `${moveDuration}s`,
    "--total-duration": `${totalDuration}s`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    ...style,
  };

  const rectangleClasses = `rectangle border-[2px] ${borderColor} bg-[rgba(140,146,116,0.6)] flex items-center justify-center`;

  return (
    <div ref={rectangleRef} className={rectangleClasses} style={styleProps}>
      <span className="text-sm font-semibold">{text}</span>
    </div>
  );
};

Rectangle.propTypes = {
  text: PropTypes.string,
  initialPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  finalPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  borderColor: PropTypes.string.isRequired,
  rotationDuration: PropTypes.number.isRequired,
  moveDuration: PropTypes.number.isRequired,
  style: PropTypes.object,
  isGridInView: PropTypes.bool.isRequired,
};

export default Rectangle;
