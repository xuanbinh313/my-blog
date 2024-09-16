"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
});

export default async function loginUser(formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return null
//   redirect("/admin");
  // Mutate data
}
