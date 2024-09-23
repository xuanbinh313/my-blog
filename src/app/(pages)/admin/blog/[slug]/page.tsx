"use client";

import RichTextEditor from "@/components/richtext-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  slug: z.string().min(1, { message: "Slug is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  image: z.any().refine((files) => files, "Image file is required"),
  content: z.string().min(1, { message: "Content is required" }),
  published: z.boolean().default(false),
  hero: z.number({ message: "Hero is number" }).nullable(),
});
const initialState = {
  message: "",
};
export default function CreateUpdateBlog() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slug: "a",
      title: "b",
      image: undefined,
      content: "d",
      published: false,
      hero: null,
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // TODO: submit here
    console.log(data);
  };
  return (
    <main className="flex flex-col gap-7">
      <div className="bg-destructive rounded-lg px-10 py-7 relative ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Slug</FormLabel>
                  <FormControl className="dark:bg-zinc-700 bg-secondary">
                    <Input
                      className="rounded-xl px-4 py-5"
                      placeholder="Slug"
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
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Title
                    </FormLabel>
                    <FormControl className="dark:bg-zinc-700 bg-secondary">
                      <Input
                        className="rounded-xl px-4 py-5"
                        placeholder="Title"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...rest } }) => {
                const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
                  const file = e?.target?.files;
                  if (file) {
                    onChange(file);
                  }
                };
                return (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Image
                    </FormLabel>
                    <FormControl className="dark:bg-zinc-700 bg-secondary">
                      <Input
                        {...rest}
                        className="rounded-xl px-4 py-5"
                        placeholder="Image"
                        type="file"
                        onChange={handleFile}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                return (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    name={field.name}
                  />
                );
              }}
            />
            <Button className="w-full" type="submit">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
