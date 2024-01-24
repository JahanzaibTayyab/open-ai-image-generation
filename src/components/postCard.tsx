import Image from "next/image";
import { Post } from "@/types/types";

interface PostArtProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Post;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function PostCard({
  post,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: PostArtProps) {
  return (
    <div key={post.id} className="grid gap-4">
      <Image
        src={post.image}
        alt={post.prompt}
        width={width}
        height={height}
        className="h-auto max-w-full rounded-lg transition-all hover:scale-105"
      />
    </div>
  );
}
