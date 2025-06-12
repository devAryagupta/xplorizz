import React from "react";
import "./Skeleton.css";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width="100%", height="1rem", className }) => (
  <div
    className={`skeleton ${className||""}`}
    style={{ width, height }}
  />
);

export default Skeleton;