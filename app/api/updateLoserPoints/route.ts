import { getRandomArithmeticQuestion } from "@/game-engine/randomMaths";
import { currentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await currentUser();
  const player = await prisma?.user.findUnique({
    where: {
      id: user?.id,
    },
  });
  if (!player) return NextResponse.json({ error: "Invalid crendential!" });
  if (player.proPoints > 0) {
    await prisma?.user.update({
      where: {
        id: user?.id,
      },
      data: {
        proPoints: player.proPoints - 20,
      },
    });
    return NextResponse.json({ success: "Success!" });
  }

  await prisma?.user.update({
    where: {
      id: user?.id,
    },
    data: {
      loserPoints: player.loserPoints + 20,
    },
  });

  return NextResponse.json({ name: "hiromichi" });
}
