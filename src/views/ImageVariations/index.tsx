"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const PostFormSchema = z.object({
  image: z.string().refine((data) => data.length > 0, {
    message: "Image is required.",
  }),
  openAIKey: z.string().refine((data) => data.length > 0, {
    message: "OpenAI Key is required.",
  }),
});

const ImageVariation = () => {
  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
  });

  console.log(form.getValues().image);

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState<any>();

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]) as any);
      form.setValue("image", "Set Image");
    }
  };

  async function onSubmit(values: z.infer<typeof PostFormSchema>) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("n", "5");
      formData.append("size", "512x512");
      const response = await fetch(
        "https://api.openai.com/v1/images/variations",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${values.openAIKey}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log("🚀 ~ onSubmit ~ data:", data);

      // setContent(data.choices[0].message.content);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Variations (DALL·E 2 only)
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px]">
          The image variations endpoint allows you to generate a variation of a
          given image.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        <div className="p-5">
          <Form {...form}>
            <form
              className="w-2/3 space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Picture</FormLabel>
                      <FormControl>
                        <Input
                          id="picture"
                          type="file"
                          onChange={onImageChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="openAIKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Open AI Key</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Openai Key"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div />
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Please wait" : "Upload"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="border border-dashed p-5">
          <img
            className="w-full h-[300px] object-cover"
            src={image as unknown as string}
            alt="url Image"
          />
        </div>
        <div className="border border-dashed p-5">
          <p className="leading-7 [&:not(:first-child)]:mt-6">{content}</p>
        </div>
      </div>
    </section>
  );
};
export default ImageVariation;
