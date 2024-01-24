"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import React from "react";
import { downloadImage } from "@/utils";

function DownloadImage({ id, photo }: { id: string; photo: string }) {
  return (
    <Button type="button" onClick={() => downloadImage(id, photo)}>
      Download
      <ArrowDownTrayIcon className="h-[20px] w-[20px] ml-1" />
    </Button>
  );
}

export default DownloadImage;
