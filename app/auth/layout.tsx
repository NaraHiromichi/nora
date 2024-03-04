import { Inter } from "next/font/google";
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });
export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-screen h-[90vh]">{children}</main>;
}
