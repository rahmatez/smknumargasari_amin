import React from "react";

const Content = ({ children, className, fullWidth = false }) => {
  return (
    <div
      className={`px-4 sm:px-6 md:px-8 lg:px-12 mx-auto ${
        !fullWidth ? "max-w-7xl" : ""
      } ${className || ""}`}>
      {children}
    </div>
  );
};

export default Content;
