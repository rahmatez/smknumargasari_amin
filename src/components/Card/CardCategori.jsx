import React from "react";
import { Link } from "react-router-dom";

const CardCategori = ({ title, icon, navigateUrl, className }) => {
  // Icon default jika tidak disediakan
  const IconComponent = icon || (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  );

  return (
    <Link
      to={navigateUrl}
      className={`hover-scale rounded-xl overflow-hidden border-2 border-[#6148FF] bg-white p-4 flex flex-col items-center justify-center gap-3 transition-all hover:shadow-md ${
        className || ""
      }`}>
      <div className="text-[#6148FF]">{IconComponent}</div>
      <h3 className="font-bold text-center text-gray-800">{title}</h3>
    </Link>
  );
};

export default CardCategori;
