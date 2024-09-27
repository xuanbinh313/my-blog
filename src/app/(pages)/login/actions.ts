"use server";

import { redirect } from "next/navigation";

export default async function loginUser(formData: {
  email: string;
  password: string;
}) {
  console.log(formData);
  redirect("/admin");
  // Mutate data
}
