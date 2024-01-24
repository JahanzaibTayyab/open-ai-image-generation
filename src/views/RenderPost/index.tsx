import { PostCard } from "@/components/postCard";
import React from "react";
import { getPosts } from "@/lib/actions";

async function RenderPost({ query }: { query: string }) {
  const posts = await getPosts(query);
  return (
    <div className="p-5 sm:p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} width={500} height={500} />
        ))}
      </div>
    </div>
  );
}

export default RenderPost;
