"use server";

import { PostFormSchema } from "@/views/TextToImage";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function generateFileName(name: string, prompt: string): string {
  // Extract keywords from the prompt
  const keywords = prompt
    .split(" ")
    .filter((word) => word.length > 2)
    .slice(0, 2);

  // Combine name and keywords to form the file name
  const fileName = `${name.replace(/\s/g, "_")}_${keywords.join("_")}`;

  return fileName;
}

export const createPost = async (values: z.infer<typeof PostFormSchema>) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const photoUrl = await cloudinary.uploader.upload(values.photo as string);
  const post = {
    name: values.name,
    prompt: values.prompt,
    image: photoUrl.url,
  };
  const { data, error } = await supabase
    .from("post")
    .insert([{ ...post }])
    .select();
  revalidatePath("/");
  redirect("/");
};

export const getPosts = async (query: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: post, error } = await supabase.from("post").select("*");
  return post;
};
