"use client";

import LoginForm from "./components/login-form";
import { loginUser } from "./actions";

export default function LoginPage() {
  return <LoginForm loginUser={loginUser} />;
}
