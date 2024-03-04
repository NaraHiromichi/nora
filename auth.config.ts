import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { logInSchema } from "./schemas";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${profile.name}&radius=20&size=90`,
          level: 1,
          exp: 0,
          expGap: 2500,
          role: "USER",
          proPoints: 0,
          loserPoints: 0,
        };
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = logInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
