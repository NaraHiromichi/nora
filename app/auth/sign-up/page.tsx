import Form from "@/app/components/register/Form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
const page = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Form />
    </div>
  );
};

export default page;
