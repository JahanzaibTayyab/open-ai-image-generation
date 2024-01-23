import { PostCard } from "@/components/postCard";
import React from "react";
import { posts } from "@/utils/data";

function RenderPost({ query }: { query: string }) {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 justify-center items-center mt-10">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          className="w-[250px]"
          aspectRatio="portrait"
          width={250}
          height={330}
        />
      ))}
    </div>
  );
}

export default RenderPost;
