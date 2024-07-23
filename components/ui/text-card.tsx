import React from "react";

interface TextCardProps {
  children: React.ReactNode;
}

const TextCard: React.FC<TextCardProps> = ({ children }) => {
  return (
    <div className="bg-stone-700 bg-opacity-85 dark:bg-gray-800 dark:bg-opacity-90 text-white p-6 text-xl rounded-lg shadow-lg space-y-6 overflow-hidden">
      {children}
    </div>
  );
};

export default TextCard;
