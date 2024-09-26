import type { Hero as HeroType } from "@/app/__generated__/resolvers-types";
import { client, uploadImage } from "@/app/utils/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, PencilLine } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { H1 } from "../ui/typography";

interface HeroProps {
  data?: HeroType;
}
export function Hero({ data }: HeroProps) {
  return (
    <div className="w-full border-0 relative p-5">
      <div className="flex flex-col gap-4 text-center max-w-lg mx-auto">
        <figure className="flex flex-col gap-2">
          {data?.image && (
            <Image
              className="rounded-full object-cover mx-auto"
              src={data?.image}
              alt="test"
              width={80}
              height={80}
            />
          )}
          <figcaption className="text-xs text-muted-foreground">
            {data?.subtitle}
          </figcaption>
        </figure>
        <H1>{data?.title}</H1>
        <p className="text-muted-foreground">{data?.content}</p>
      </div>
    </div>
  );
}
const FormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  subtitle: z.string().min(1, { message: "Subtitle is required" }),
  image: z.string().min(1, "Image file is required"),
  content: z.string().min(1, { message: "Content is required" }),
});
export function HeroForm({ value,onChange }: HeroProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      image: "",
      content: "",
    },
  });
  const [file, setFile] = useState<File | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const onSubmit = async (tag: z.infer<typeof FormSchema>) => {
    if (file) {
      try {
        await uploadImage(file);
        setFile(null);
      } catch (error) {
        console.log("ERROR", error);
      }
    }
    try {
      const res = await client.updateTag({ id: Number(id), payload: tag });
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
  const srcImage = file ? URL.createObjectURL(file) : imagePreview;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-muted-foreground">Title</FormLabel>
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
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Subtitle</FormLabel>
              <FormControl className="dark:bg-zinc-700 bg-secondary">
                <Input
                  className="rounded-xl px-4 py-5"
                  placeholder="Subtitle"
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
                <FormLabel className="text-muted-foreground">Image</FormLabel>
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
                    <input {...rest} onChange={handleFile} type="file" hidden />
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
                <FormLabel className="text-muted-foreground">Content</FormLabel>
                <FormControl className="dark:bg-zinc-700 bg-secondary">
                  <Textarea
                    className="rounded-xl px-4 py-5"
                    placeholder="Content"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="absolute top-0 right-0">
          <div className="flex flex-row">
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
  );
}
