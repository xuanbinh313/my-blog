"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import loginUser from "../actions";

const FormSchema = z.object({
  email: z.string().email({
    message: "Email not correct",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
const initialState = {
  message: '',
}
export default function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "binhcodev@gmail.com",
      password: "123456",
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    loginUser(data)
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="max-w-4xl cursor-auto">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Login admin</CardTitle>
              <CardDescription>
                Enter your email below to manage your account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Email
                    </FormLabel>
                    <FormControl className="dark:bg-zinc-700 bg-secondary">
                      <Input
                        className="rounded-xl px-4 py-5"
                        placeholder="b@example.com"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Password
                    </FormLabel>
                    <FormControl className="dark:bg-zinc-700 bg-secondary">
                      <Input
                        className="rounded-xl px-4 py-5"
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit">
                Login account
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
