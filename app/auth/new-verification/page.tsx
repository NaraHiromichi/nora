"use cilent";

import NewVerification from "@/app/components/NewVerification";

import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <NewVerification />;
    </Suspense>
  );
}
