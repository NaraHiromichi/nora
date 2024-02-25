import React from "react";

const ExpBar = () => {
  return (
    <div className="w-[90vw] h-20 mx-auto mt-8">
      <div className="block w-full h-3 rounded-full bg-secondary relative">
        <div className="w-[20%] h-full rounded-full bg-main absolute left-0 top-0"></div>
      </div>
      <div className="w-full h-4 mt-3 flex justify-between text-primary font-medium">
        <span className="">Exp:</span>
        <span className="">1200/2500</span>
      </div>
    </div>
  );
};

export default ExpBar;
