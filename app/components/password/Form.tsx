"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { passwordSchema } from "@/schemas";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { newPassword } from "@/actions/new-password";
import { redirect, useSearchParams } from "next/navigation";
const Form = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = (values: z.infer<typeof passwordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  useEffect(() => {
    if (success) redirect("/auth/sign-in");
  }, [success]);
  return (
    <form
      className="w-[77vw] max-w-md text-primary"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="mb-4 font-bold text-lg">Enter a new password</h2>
      <label className="text-base font-bold">Password</label>
      <input
        className="w-full h-12 mt-2 mb-2 p-3 border-4 border-secondary rounded-lg bg-transparent"
        {...register("password")}
        disabled={isPending}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <button
        className="w-full h-11 font-bold rounded-lg bg-secondary"
        type="submit"
        disabled={isPending}
      >
        Reset Password
      </button>
      {error && <FormError message={error} />}
      {success && <FormSuccess message={success} />}
    </form>
  );
};

export default Form;
