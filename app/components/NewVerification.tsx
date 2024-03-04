"use client";
import { newVerification } from "@/actions/new-verification";
import { BackgroundGradientAnimation } from "@/app/components/ui/background-gradient-animation";
import { redirect, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const NewVerification = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);
  useEffect(() => {
    onSubmit();
    if (success) redirect("/dashboard");
  }, [onSubmit]);
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          {!success && error ? error : "Confirming your verification..."}
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default NewVerification;
