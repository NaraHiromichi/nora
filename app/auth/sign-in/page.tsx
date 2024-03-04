import Form from "@/app/components/logIn/Form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export default function Page() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Form />
    </div>
  );
}
