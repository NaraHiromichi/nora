"use client";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetSchema } from "@/schemas";
import { reset } from "@/actions/reset";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
const Form = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
  });
  const onSubmit = (values: z.infer<typeof resetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(values).then((data) => {
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
      <h2 className="mb-4 font-bold text-lg">Reset Password</h2>
      <label className="text-base font-bold">Email</label>
      <input
        className="w-full h-12 mt-2 mb-2 p-3 border-4 border-secondary rounded-lg bg-transparent"
        {...register("email")}
        disabled={isPending}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <button
        className="w-full h-11 font-bold rounded-lg bg-secondary"
        type="submit"
        disabled={isPending}
      >
        Send email
      </button>
      {error && <FormError message={error} />}
      {success && <FormSuccess message={success} />}
    </form>
  );
};

export default Form;
