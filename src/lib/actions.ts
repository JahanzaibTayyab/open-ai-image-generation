"use server";

import { PostFormSchema } from "@/views/TextToImage";
import { cookies } from "next/headers";
import { createClient } from "./supabase/server";
import { z } from "zod";

export const createPost = async (values: z.infer<typeof PostFormSchema>) => {
  console.log("🚀 ~ createPost ~ values:", values);
};

export const getPosts = async (query: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  console.log(await supabase.storage.listBuckets());
  const { data: post, error } = await supabase.from("post").select("*");

  console.log("🚀 ~ getPosts ~ notes:", post);
  return post;
};
