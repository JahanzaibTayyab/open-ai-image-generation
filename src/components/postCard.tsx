import DownloadImage from "./downloadImage";
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
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={post.image}
          alt={post.prompt}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>

      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">{post.name}</h3>
          <p className="text-xs text-muted-foreground">{post.prompt}</p>
        </div>
        <DownloadImage id={`${post.id}`} photo={post.image} />
      </div>
    </div>
  );
}
