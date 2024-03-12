import { generateReadyQuestion } from "@/game-engine/randomMaths";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const randomExpression = await generateReadyQuestion();
  console.log(randomExpression);

  return NextResponse.json(randomExpression);
}

export const dynamic = "force-dynamic";
