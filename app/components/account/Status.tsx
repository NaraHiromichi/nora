import React from "react";

const Status = ({ label, amount }: { label: string; amount: number }) => {
  return (
    <div className="w-[90vw] max-w-[800px] h-16 mx-auto mt-4 flex justify-between items-center text-xl text-primary font-bold rounded-md overflow-hidden bg-secondary">
      <span className="w-[80%] h-full px-6 flex items-center">{label}</span>
      <span className="w-[18%] h-full flex justify-center items-center bg-main">
        {amount}
      </span>
    </div>
  );
};

export default Status;
