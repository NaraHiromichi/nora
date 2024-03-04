import { getRandomArithmeticQuestion } from "@/game-engine/randomMaths";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const randomExpression = JSON.stringify(getRandomArithmeticQuestion());
  console.log(randomExpression);

  return NextResponse.json(randomExpression);
}
