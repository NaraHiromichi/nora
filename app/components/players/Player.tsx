import React from "react";

const Player = ({
  name,
  level,
  points,
  isPlayerLoser,
  image,
}: {
  name: string;
  level: string;
  points: string;
  isPlayerLoser: boolean;
  image: string | null;
}) => {
  return (
    <div className="w-full min-w-[340px] p-4 h-28 my-5 text-primary font-bold flex justify-between items-center rounded-md">
      {image ? (
        <img
          className="w-[20%] min-w-[60px] min-h-[60px] max-w-[70px] max-h-[70px] object-cover"
          src={image}
          alt="profile"
        />
      ) : (
        <img
          className="w-[20%] min-w-[60px] min-h-[60px] max-w-[70px] max-h-[70px] object-cover"
          src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Nara&radius=20&backgroundColor=00ADB5&size=90"
          alt="profile"
        />
      )}
      <div className="w-[75%]">
        <div className="w-full flex justify-between items-centers">
          <span className="text-xl">{name}</span>
          <span className="text-base font-medium">Level: {level}</span>
        </div>
        <span className="text-sm">
          {isPlayerLoser ? "Looser Points: " : "Pro Points: "} {points}
        </span>
      </div>
    </div>
  );
};

export default Player;
