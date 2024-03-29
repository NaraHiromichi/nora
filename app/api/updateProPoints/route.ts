import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await currentUser();
  const player = await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!player) return NextResponse.json({ error: "Invalid crendential!" });
  if (player.expGap - player.exp >= 30) {
    await db.user.update({
      where: {
        id: player?.id,
      },
      data: {
        exp: player.exp + 30,
      },
    });
  } else {
    const difference = 30 - (player.expGap - player.exp);
    await db.user.update({
      where: {
        id: player.id,
      },
      data: {
        exp: difference,
        expGap: player.expGap + 50,
        level: player.level + 1,
      },
    });
  }
  if (player.loserPoints > 0) {
    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        loserPoints: player.loserPoints - 20,
      },
    });
    return NextResponse.json({ success: "Success!" });
  }
  await db.user.update({
    where: {
      id: user?.id,
    },
    data: {
      proPoints: player.proPoints + 20,
    },
  });

  return NextResponse.json({ success: "Success!" });
}
