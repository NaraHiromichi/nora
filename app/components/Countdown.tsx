import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "@/app/globals.css";

const updateForLoser = () => {
  fetch("/api/updateLoserPoints");
};

const RenderTime = ({ remainingTime }: { remainingTime: any }) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper text-primary">
      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? "down" : ""}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  );
};

function Countdown({
  id,
  setRemainingTime,
  setShouldDisplay,
}: {
  id: string;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
  setShouldDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          size={100}
          isPlaying
          duration={10}
          colors={["#4ADE80", "#EAB308", "#DB2777", "#E11D48"]}
          key={id}
          colorsTime={[10, 6, 3, 0]}
          onUpdate={(remainingTime) => {
            setRemainingTime(remainingTime);
            if (remainingTime === 0) {
              setShouldDisplay(false);
              updateForLoser();
            }
          }}
        >
          {RenderTime}
        </CountdownCircleTimer>
      </div>
    </>
  );
}

export default Countdown;
