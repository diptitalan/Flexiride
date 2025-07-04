import React from "react";
import { GoBell } from "react-icons/go";

const BellIcon: React.FC<{ className?: string }> = ({ className }) => {
  return <GoBell className={className} />;
};

export default BellIcon;
