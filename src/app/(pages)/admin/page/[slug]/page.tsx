"use client";
import { client } from "@/app/utils/api";
import { SelectQuery } from "@/components/select-query";
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
import { Framework, SelectQueryMulti } from "@/components/ui/multi-select";
import { Toggle } from "@/components/ui/toggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Check, PencilLine, Stamp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  slug: z.string().min(1, { message: "Slug is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  published: z.boolean().default(false),
  hero: z.number({
    required_error: "Hero is required",
    invalid_type_error: "Hero must be a number",
  }),
  blocks: z.array(z.number(), {
    required_error: "Block is required",
    invalid_type_error: "Block must be a number",
  }),
});

export default function CreateUpdatePage() {
  const { slug } = useParams<{ slug: string }>();
  const [id, slugPath] = slug.split("-");
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["page", slug],
    queryFn: async () => (await client.getPage({ slug: slugPath })).page,
    enabled: !!slug && slug !== "new",
  });

  const [isEdit, setIsEdit] = useState(!(!!slug && slug !== "new"));
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slug: "",
      title: "",
      hero: undefined,
      published: false,
      blocks: [],
    },
  });

  const onSubmit = async (page: z.infer<typeof FormSchema>) => {
    console.log("tag", page);

    // if (slug === "new") {
    //   try {
    //     const res = await client.createTag({ payload: tag });
    //     if (res.createTag.success) {
    //       router.push(`/admin/tag`);
    //     }
    //   } catch (error) {
    //     console.log("ERROR", error);
    //   }
    // }
    // try {
    //   const res = await client.updateTag({ id: Number(id), payload: tag });
    //   if (res.updateTag.success) {
    //     router.push(`/admin/tag`);
    //   }
    // } catch (error) {
    //   console.log("ERROR", error);
    // }
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
    if (data) {
      form.reset({
        ...data,
        hero: data.hero.id,
        blocks: data.blocks.map((b) => b.id),
      });
    }
  }, [data]);
  console.log("ERRORS", form.formState.errors, form.getValues());
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
              name="hero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Hero</FormLabel>
                  <FormControl className="dark:bg-zinc-700 bg-secondary">
                    <SelectQuery
                      {...field}
                      type="getHeros"
                      placeholder="Select a Hero"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blocks"
              render={({ field }) => {
                return (
                  <SelectQueryMulti
                    type="getBlocks"
                    nameValue="id"
                    typeValue="number"
                    selected={field.value}
                    onSelectedChange={field.onChange}
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
