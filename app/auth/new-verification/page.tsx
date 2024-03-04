"use cilent";
import { newVerification } from "@/actions/new-verification";
import NewVerification from "@/app/components/NewVerification";
import { BackgroundGradientAnimation } from "@/app/components/ui/background-gradient-animation";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function Page() {
  return <NewVerification />;
}
