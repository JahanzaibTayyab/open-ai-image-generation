import Image from "next/image";
import { Post } from "@/types/types";
import { cn } from "@/lib/utils";

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
      <div className="overflow-hidden rounded-md">
        <Image
          src={post.image}
          alt={post.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
    </div>
  );
}
