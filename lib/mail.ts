import { Resend } from "resend";

const EmailFrom = "htet-wanna-linn.com";
const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: EmailFrom,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here to reset your password</a></p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  try{
     await resend.emails.send({
      from: EmailFrom,
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here to confirm your password</a></p>`,
  });
  }catch (error) {
    if(error){
      console.log(error)
    }
  }
  // await resend.emails.send({
  //   from: EmailFrom,
  //   to: email,
  //   subject: "Confirm your email",
  //   html: `<p>Click <a href="${confirmLink}">here to confirm your password</a></p>`,
  // });
  console.log("email:", email, "token", token, "emailFrom", EmailFrom, confirmLink)
};
