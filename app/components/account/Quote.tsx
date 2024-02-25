import React from "react";

const Quote = () => {
  return (
    <div className="w-[90vw] mx-auto mt-4 text-primary text-base font-bold">
      <div className="w-full min-h-28 max-h-40 p-2 flex text-center items-center rounded-md bg-main">
        "Your self-worth is determined by you. You don't have to depend on
        someone telling you who you are."
      </div>
      <span className="w-full mt-3 pr-1 flex justify-end items-center underline">
        Beyoncé
      </span>
    </div>
  );
};

export default Quote;
