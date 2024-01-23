"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import React from "react";
import { downloadImage } from "@/utils";

function DownloadImage({ id, photo }: { id: string; photo: string }) {
  return (
    <button type="button" onClick={() => downloadImage(id, photo)}>
      <ArrowDownTrayIcon className="h-[24px] w-[24px] text-gray-500 peer-focus:text-gray-900" />
    </button>
  );
}

export default DownloadImage;
