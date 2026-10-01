import React from "react";

interface BlogContentRendererProps {
  content: string;
  className?: string;
}

export const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({
  content,
  className = "",
}) => {
  if (!content) return null;

  return (
    <div
      className={`wp-content-prose ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
