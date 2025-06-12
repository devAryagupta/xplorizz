import React from "react";
import "./EmptyState.css";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <div className="empty-state">
    <p>{message}</p>
  </div>
);

export default EmptyState;