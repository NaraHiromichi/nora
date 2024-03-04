"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const ExpBar = ({ exp, expGap }: { exp: number; expGap: number }) => {
  const expFraction = exp / expGap;
  const expPercentage = expFraction * 100 + "%";

  return (
    <div className="w-[90vw] max-w-[800px] h-20 mx-auto mt-8">
      <div className="block w-full h-3 rounded-full bg-secondary relative">
        <div
          style={{ width: expPercentage ? expPercentage : "0%" }}
          className={`h-full rounded-full bg-main absolute left-0 top-0`}
        ></div>
      </div>
      <div className="w-full h-4 mt-3 flex justify-between text-primary font-medium">
        <span className="">Exp:</span>
        <span className="">
          {exp.toString()}/{expGap.toString()}
        </span>
      </div>
    </div>
  );
};

export default ExpBar;
