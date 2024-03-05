import React from "react";

interface RandomQuote {
  text: string;
  number: string;
  found: true;
  type: string;
}

const Quote = async () => {
  const randomQuote = await fetch("http://numbersapi.com/random/math", {
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => {
      return data.json();
    })
    .then((data: RandomQuote) => data);
  return (
    <div className="w-[90vw] max-w-[800px] mx-auto mt-4 text-primary text-xs md:text-base font-bold">
      <div className="w-full h-20 max-h-40 p-1 md:p-2 flex text-center items-center rounded-md bg-main">
        {randomQuote && randomQuote.text}
      </div>
      {/* <span className="w-full mt-3 pr-1 flex justify-end items-center underline">
        Beyoncé
      </span> */}
    </div>
  );
};

export default Quote;
