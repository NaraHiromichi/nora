import Form from "@/app/components/password/Form";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Suspense>
        <Form />
      </Suspense>
    </div>
  );
}
