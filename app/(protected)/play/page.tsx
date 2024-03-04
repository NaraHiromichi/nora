"use client";
import React, { useEffect, useState } from "react";
import { BackgroundGradient } from "../../components/ui/background-gradient";
import { Button } from "../../components/ui/moving-border";
import Countdown from "../../components/Countdown";
import { useSession } from "next-auth/react";
interface PossibleAnswer {
  id: number;
  num: number;
}
interface Expression {
  first_number: number;
  second_number: number;
  operator: string;
  question: string;
  answer: number;
  possibleAnswers: PossibleAnswer[];
}

export default function Page() {
  const [key, setKey] = useState(makeid(5));
  const [remainingTime, setRemainingTime] = useState(10);
  const [expression, setExpression] = useState<Expression | null>();
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [isNewGame, setIsNewgame] = useState(false);
  const [shouldDisplay, setShouldDisplay] = useState(true);
  const fetchExpression = () => {
    fetch("/api/generateRandomExpression")
      .then((res) => res.json())
      .then((data) => {
        setExpression(JSON.parse(data));
        console.log(JSON.parse(data));
      });
    setShouldDisplay(true);
  };
  const updateForLoser = () => {
    fetch("/api/updateLoserPoints");
  };
  const updateForPro = () => {
    fetch("/api/updateProPoints");
  };
  useEffect(() => {
    fetchExpression();
  }, []);

  function makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <div className="h-screen flex flex-col justify-center">
      {shouldDisplay && (
        <Countdown
          id={key}
          setShouldDisplay={setShouldDisplay}
          setRemainingTime={setRemainingTime}
        />
      )}
      <div className="w-[100vw] max-w-md mt-10 mx-auto flex justify-center">
        <BackgroundGradient className="text-primary text-5xl rounded-[22px] w-[90vw] max-w-md flex justify-center items-center h-[15vh] p-4 sm:p-10 bg-zinc-900">
          {!isWrong && remainingTime !== 0
            ? expression?.question && expression.question + " = ?"
            : "Game Over!"}
        </BackgroundGradient>
      </div>
      <div className="w-[90vw] max-w-md flex justify-between items-center mx-auto mt-40">
        {expression?.possibleAnswers.length !== 0 &&
          (remainingTime === 0 || !shouldDisplay ? (
            <Button
              containerClassName="w-[90vw]"
              key="restart"
              onClick={() => {
                fetchExpression();
                setKey(makeid(5));
                setShouldDisplay(true);
                setIsWrong(false);
                setIsNewgame(false);
              }}
              borderRadius="1.75rem"
              className=" bg-zinc-900 text-lg text-primary font-bold border-slate-800"
            >
              Restart
            </Button>
          ) : (
            expression?.possibleAnswers.map((answer) => {
              return (
                <Button
                  key={answer.id}
                  borderRadius="1.75rem"
                  className=" bg-zinc-900 text-lg text-primary font-bold border-slate-800"
                  onClick={() => {
                    if (answer.num !== expression.answer) {
                      console.log(
                        "btn: ",
                        answer.num,
                        "Ans: ",
                        expression.answer,
                        answer.num !== expression.answer
                      );
                      setIsWrong(true);
                      setShouldDisplay(false);
                      updateForLoser();
                      return;
                    }
                    setIsNewgame(true);
                    setIsWrong(false);
                    fetchExpression();
                    setKey(makeid(5));
                    updateForPro();
                  }}
                >
                  {answer.num}
                </Button>
              );
            })
          ))}
      </div>
    </div>
  );
}
