import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <Dialog>
      <DialogTrigger>
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Image Detail</DialogTitle>
          <DialogDescription className="py-5">
            <div className="overflow-hidden rounded-md">
              <Image
                src={post.image}
                alt={post.name}
                width={width}
                height={height}
                className=""
              />
            </div>
            <div className="space-y-1 text-sm mt-5">
              <h3 className="font-medium leading-none text-slate-500">
                {post.name}
              </h3>
              <p className="text-xs text-muted-foreground text-slate-900">
                {post.prompt}
              </p>
            </div>
            <div className="mt-5 flex justify-end">
              <DownloadImage id={`${post.id}`} photo={post.image} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
