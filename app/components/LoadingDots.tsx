import React from "react";

const LoadingDots = () => {
  return (
    <div className="flex space-x-2 justify-center items-center h-full invert">
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingDots;
