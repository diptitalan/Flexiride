// components/Heading.tsx
import React from "react";
import clsx from "clsx";

type HeadingLevel = "h1" | "h2" | "h3";

interface HeadingProps {
  title: string;
  level?: HeadingLevel;
  className?: string; // <-- added this
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-[56px] leading-[64px] font-semibold tracking-normal font-inter",
  h2: "text-[40px] leading-[48px] font-normal tracking-[-0.02em]",
  h3: "text-[24px] leading-[32px] font-medium tracking-normal",
};

const Heading: React.FC<HeadingProps> = ({
  title,
  level = "h1",
  className,
}) => {
  const Tag = level;

  return (
    <div className="bg-[#fffbf3] font-sans">
      <Tag className={clsx("text-black", headingStyles[level], className)}>
        {title}
      </Tag>
    </div>
  );
};

export default Heading;
