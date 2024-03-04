import Player from "@/app/components/players/Player";
import { getAllUser } from "@/data/user";
import React from "react";
import { User } from "@prisma/client";

export default async function Page() {
  const users: User[] | null = await getAllUser();
  return (
    <div className="w-[90vw] max-w-[800px] mx-auto [&>*:nth-child(odd)]:bg-main [&>*:nth-child(even)]:bg-secondary">
      {users?.map((user: User) => {
        const level = user.level.toString();
        let points = 0;
        let isPlayerLoser = false;
        if (user.loserPoints > 0) {
          points = user.loserPoints;
          isPlayerLoser = true;
        } else if (user.loserPoints === user.proPoints) {
          points = user.loserPoints;
          isPlayerLoser = true;
        } else {
          points = user.proPoints;
        }
        return (
          <Player
            key={user.id}
            isPlayerLoser={isPlayerLoser}
            name={user.name}
            level={level}
            points={points.toString()}
            image={user.image}
          />
        );
      })}
    </div>
  );
}
