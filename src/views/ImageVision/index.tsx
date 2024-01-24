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
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const PostFormSchema = z.object({
  url: z.string().refine((data) => data.length > 0, {
    message: "Prompt is required.",
  }),
  openAIKey: z.string().refine((data) => data.length > 0, {
    message: "OpenAI Key is required.",
  }),
});

const ImageVision = () => {
  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
  });

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);

  async function onSubmit(values: z.infer<typeof PostFormSchema>) {
    try {
      setLoading(true);
      setShowImage(true);
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${values.openAIKey}`,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: "What’s in this image?",
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: `${values.url}`,
                    },
                  },
                ],
              },
            ],
            max_tokens: 300,
            model: "gpt-4-vision-preview",
          }),
        }
      );
      const data = await response.json();
      setContent(data.choices[0].message.content);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Vison</h1>
        <p className="mt-2 text-[#666e75] text-[14px]">
          GPT-4 with Vision, sometimes referred to as GPT-4V or
          gpt-4-vision-preview in the API, allows the model to take in images
          and answer questions about them. Historically, language model systems
          have been limited by taking in a single input modality, text. For many
          use cases, this constrained the areas where models like GPT-4 could be
          used.
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
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Public Image Url</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://via.placeholder.com/350x150"
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
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Please wait" : "Read"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="border border-dashed p-5">
          {showImage && (
            <img
              className="w-full h-[300px] object-cover"
              src={form.getValues().url}
              alt="url Image"
            />
          )}
        </div>
        <div className="border border-dashed p-5">
          <p className="leading-7 [&:not(:first-child)]:mt-6">{content}</p>
        </div>
      </div>
    </section>
  );
};
export default ImageVision;
