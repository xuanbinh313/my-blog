"use client";

import { client } from "@/app/utils/api";
import RichTextEditor from "@/components/richtext-editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FancyMultiSelect, Framework } from "@/components/ui/multi-select";
import { Toggle } from "@/components/ui/toggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Check, PencilLine, Stamp } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const FRAMEWORKS = [
  {
    value: "javascript",
    label: "JavaScript",
    id: 17
  },
  {
    value: "java",
    label: "Java",
    id: 19,
  },
  {
    value: "python",
    label: "Python",
    id: 18,
  },
  {
    value: "reactjs",
    label: "ReactJS",
    id: 20
  },
  
];
const FormSchema = z.object({
  slug: z.string().min(1, { message: "Slug is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  image: z.string().min(1, "Image file is required"),
  content: z.string().min(1, { message: "Content is required" }),
  published: z.boolean().default(false),
  tags: z
    .array(z.object({ id: z.number(), title: z.string(), slug: z.string() }))
    .default([]),
});
const initialState = {
  message: "",
};

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
};

export default function CreateUpdateBlog() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => await client.blogBySlug({ slug }),
  });
  const [isEdit, setIsEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slug: "",
      title: "",
      image: "",
      content: "",
      published: false,
      tags: [],
    },
  });
  form.watch("tags")
  const onSubmit = async (blog: z.infer<typeof FormSchema>) => {
    // TODO: submit here
    console.log("update");
    if (file) {
      await uploadImage(file);
    }
    const tags = blog.tags.map((it) => it.id);
    if (data?.blog?.image) {
      client.updateBlog({ slug, blog: { ...blog, tags } });
    }
  };
  const handleSubmit = () => {
    if (isEdit) {
      form.handleSubmit(onSubmit)();
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };
  useEffect(() => {
    if (data?.blog) {
      form.reset(data?.blog);
      setImagePreview(`/assets/${data?.blog?.image}`);
    }
  }, [data?.blog]);
  console.log("ERRORS", form.formState.errors, form.getValues());
  const srcImage = file ? URL.createObjectURL(file) : imagePreview;
  return (
    <main className="flex flex-col gap-7 w-full">
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
                      disabled={!isEdit}
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
                        disabled={!isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => {
                const handleSelected = (selected: Framework[]) => {
                  field.onChange(
                    selected.map((it) => ({
                      title: it.label,
                      slug: it.value,
                      id: it.id,
                    }))
                  );
                };
                const value = field.value.map((it) => ({
                  label: it.title,
                  value: it.slug,
                  id: it.id,
                }));
                return (
                  <FancyMultiSelect
                    onSelectedChange={handleSelected}
                    selected={value}
                    options={FRAMEWORKS}
                  />
                );
              }}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...rest } }) => {
                const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
                  const file = e?.target?.files;
                  if (!file?.[0]) return;
                  onChange(file[0].name);
                  setFile(file[0]);
                };
                return (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Image
                    </FormLabel>
                    {value && (
                      <Image
                        width={40}
                        height={40}
                        src={srcImage}
                        alt={value || ""}
                      />
                    )}
                    <FormControl className="dark:bg-zinc-700 bg-secondary">
                      <Input
                        {...rest}
                        className="rounded-xl px-4 py-5"
                        placeholder="Image"
                        type="file"
                        onChange={handleFile}
                        disabled={!isEdit}
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
                    disabled={!isEdit}
                  />
                );
              }}
            />
            <div className="absolute top-0 right-0">
              <div className="flex flex-row">
                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => {
                    const { value, ...rest } = field;
                    return (
                      <Toggle
                        {...rest}
                        pressed={value}
                        onPressedChange={field.onChange}
                        className="data-[state=on]:text-red-500"
                        aria-label="Toggle bold"
                      >
                        <Stamp />
                      </Toggle>
                    );
                  }}
                />
                <Button
                  className="rounded-full"
                  variant="outline"
                  size="icon"
                  onClick={handleSubmit}
                  type="button"
                >
                  {!isEdit ? (
                    <PencilLine />
                  ) : (
                    <Check className=" text-green-500 hover:text-green-300" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
