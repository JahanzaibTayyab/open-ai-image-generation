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
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/actions";
import { getRandomPrompt } from "@/utils";
import preview from "/public/assets/images/preview.png";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const PostFormSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters.",
    })
    .refine((data) => data.length > 0, {
      message: "Name is required.",
    }),
  prompt: z.string().refine((data) => data.length > 0, {
    message: "Prompt is required.",
  }),
  openAIKey: z.string().refine((data) => data.length > 0, {
    message: "OpenAI Key is required.",
  }),
  photo: z.string().optional(),
});

const TextToImage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof PostFormSchema>) {
    try {
      setGeneratingImg(true);
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${values.openAIKey}`,
          },
          body: JSON.stringify({
            prompt: values.prompt,
            model: "dall-e-3",
          }),
        }
      );
      const data = await response.json();
      form.setValue("photo", data.data[0].url);
      form.setValue("prompt", data.data[0].revised_prompt);
    } catch (err) {
      alert(err);
    } finally {
      setGeneratingImg(false);
    }
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.getValues().prompt);
    form.setValue("prompt", randomPrompt);
  };

  const handleShare = async () => {
    setLoading(true);
    await createPost(form.getValues());
  };

  return (
    <section className="mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Text To Image
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate an imaginative image through DALL-E AI and share it with the
          community
        </p>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <Form {...form}>
            <form
              className="w-2/3 space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex., john" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Prompt{" "}
                        <Button
                          variant={"destructive"}
                          onClick={handleSurpriseMe}
                          size={"sm"}
                          className="h-6"
                        >
                          Surprise me
                        </Button>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                          {...field}
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
                <Button type="submit">Generate</Button>
              </div>
            </form>
          </Form>
        </div>
        <div>
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-64 p-3 h-64 flex justify-center items-center max-h-96">
            {form.getValues().photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.getValues().photo}
                alt={form.getValues().prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <Image
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
          <div className="mt-10">
            <p className="py-2 text-[#666e75] text-[14px]">
              ** Once you have created the image you want, you can share it with
              others in the community **
            </p>
            <Button disabled={loading} onClick={handleShare}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Sharing..." : "Share with the Community"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TextToImage;
