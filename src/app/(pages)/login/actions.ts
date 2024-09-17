"use server";

import { redirect } from "next/navigation";

export default async function loginUser(formData: any) {
  console.log(formData)
  redirect("/admin");
  // Mutate data
}
