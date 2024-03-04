"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/actions/login";
import Link from "next/link";
import { logInSchema } from "@/schemas";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
const Form = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
  });
  const onSubmit = (values: z.infer<typeof logInSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
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
        className="w-full h-11 font-bold rounded-lg bg-secondary"
        type="submit"
        disabled={isPending}
      >
        Sign in
      </button>
      <button
        type="button"
        onClick={() =>
          signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT })
        }
        className="w-full h-11 my-4 text-main font-bold border-4 border-main rounded-lg bg-transparent"
      >
        Sign in with google
      </button>
      <Link className="block my-2 font-bold underline" href="/auth/reset">
        Reset Password
      </Link>
      <Link
        href="/auth/sign-up"
        className={`w-full text-left font-bold underline ${
          isPending ? "pointer-events-none" : ""
        }`}
      >
        Create Account
      </Link>
    </form>
  );
};

export default Form;

// to add aceter
