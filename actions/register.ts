"use server";
import * as z from "zod";
import { registerSchema } from "@/schemas";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (value: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image: `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${name}&radius=20&size=90`,
      level: 1,
      exp: 0,
      expGap: 2500,
      loserPoints: 0,
      proPoints: 0,
    },
  });
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: "Confirmation email sent!" };
};
