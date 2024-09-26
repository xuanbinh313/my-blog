"use client";
import { client } from "@/app/utils/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  slug: z.string().min(1, { message: "Slug is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  image: z.string().min(1, "Image file is required"),
  link: z.string().nullable(),
  content: z.string().min(1, { message: "Content is required" }),
});

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
};

export default function CreateUpdatePage() {
  const { slug } = useParams<{ slug: string }>();
  const [id] = slug.split("-");
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["page", slug],
    queryFn: async () => await client.getTagById({ id: Number(id) }),
    enabled: !!slug && slug !== "new",
  });
  const [isEdit, setIsEdit] = useState(!(!!slug && slug !== "new"));
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slug: "",
      title: "",
      image: "",
      content: "",
      link: "",
    },
  });

  const onSubmit = async (tag: z.infer<typeof FormSchema>) => {
    if (file) {
      try {
        await uploadImage(file);
        setFile(null);
      } catch (error) {
        console.log("ERROR", error);
      }
    }
    if (slug === "new") {
      try {
        const res = await client.createTag({ payload: tag });
        if (res.createTag.success) {
          router.push(`/admin/tag`);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    }
    try {
      const res = await client.updateTag({ id: Number(id), payload: tag });
      if (res.updateTag.success) {
        router.push(`/admin/tag`);
      }
    } catch (error) {
      console.log("ERROR", error);
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
    if (data?.tag) {
      form.reset(data?.tag);
      setImagePreview(`/assets/${data?.tag?.image}`);
    }
  }, [data?.tag]);
  const srcImage = file ? URL.createObjectURL(file) : imagePreview;
  return (
    <main className="flex flex-col gap-7 w-full">
      <div className="bg-destructive rounded-lg px-10 py-7 relative ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Slug</FormLabel>
                  <FormControl className="dark:bg-zinc-700 bg-secondary">
                    <Input
                      className="rounded-xl px-4 py-5"
                      placeholder="slug"
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
              name="image"
              render={({ field: { onChange, value, ...rest } }) => {
                const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
                  const file = e?.target?.files;
                  if (!file?.[0]) return;
                  onChange(file[0].name);
                  setFile(file[0]);
                };
                return (
                  <FormItem className="relative">
                    <FormLabel className="text-muted-foreground">
                      Image
                    </FormLabel>
                    <div className="w-full border-0 relative p-5">
                      <figure className="flex items-center justify-center">
                        {value && (
                          <Image
                            src={srcImage}
                            alt={value || ""}
                            objectFit="cover"
                            objectPosition="center"
                            width={200}
                            height={200}
                          />
                        )}
                      </figure>
                    </div>
                    <FormControl className="dark:bg-zinc-700 bg-secondary absolute top-6 right-0 rounded-full">
                      <label>
                        <input
                          {...rest}
                          onChange={handleFile}
                          disabled={!isEdit}
                          type="file"
                          hidden
                        />
                        <div className="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                          Choose File
                        </div>
                      </label>
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
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Content
                    </FormLabel>
                    <FormControl className="dark:bg-zinc-700 bg-secondary">
                      <Textarea
                        className="rounded-xl px-4 py-5"
                        placeholder="Content"
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
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Link</FormLabel>
                  <FormControl className="dark:bg-zinc-700 bg-secondary">
                    {!isEdit && field.value ? (
                      <a href={field.value} target="_blank" rel="noreferrer">
                        {field.value}
                      </a>
                    ) : (
                      <Input
                        className="rounded-xl px-4 py-5"
                        placeholder="Link"
                        type="text"
                        {...field}
                        value={field.value ?? ""}
                        disabled={!isEdit}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className="absolute top-0 right-0">
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
            </div> */}
          </form>
        </Form>
      </div>
    </main>
  );
}
