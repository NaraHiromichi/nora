"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register as registerApi } from "@/actions/register";
import Link from "next/link";
import { registerSchema } from "@/schemas";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import LoadingDots from "../LoadingDots";
const Form = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      registerApi(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <form
      className="w-[77vw] max-w-md text-primary"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="text-base font-bold">Name</label>
      <input
        className="w-full h-12 mt-2 mb-2 p-3 border-4 border-secondary rounded-lg bg-transparent"
        {...register("name")}
        disabled={isPending}
      />
      <label className="text-base font-bold">Email</label>
      <input
        className="w-full h-12 mt-2 mb-2 p-3 border-4 border-secondary rounded-lg bg-transparent"
        {...register("email")}
        disabled={isPending}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <label className="text-base font-bold block">Password</label>
      <input
        className="w-full h-12 mt-2 mb-4 p-3 border-4 border-secondary rounded-lg bg-transparent"
        {...register("password")}
        disabled={isPending}
      />
      {errors.password && <span>{errors.password.message}</span>}
      {error != "" && error != undefined && <FormError message={error} />}
      {success != "" && success != undefined && (
        <FormSuccess message={success} />
      )}
      <button
        className="w-full h-11 text-primary font-bold border-4 border-main rounded-lg bg-main"
        type="submit"
      >
        {isPending ? <LoadingDots /> : "Create account"}
      </button>
      <button
        type="button"
        onClick={() =>
          signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT })
        }
        className="w-full h-11 my-4 font-bold rounded-lg bg-secondary"
        disabled={isPending}
      >
        Sign in with google
      </button>
      <Link
        href="/auth/sign-in"
        className={`w-full text-left font-bold underline ${
          isPending ? "pointer-events-none" : ""
        }`}
      >
        Sign-in with existing account
      </Link>
    </form>
  );
};

export default Form;
