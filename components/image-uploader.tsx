"use client";
import { ImagePlusIcon } from "lucide-react";
import React, { useRef, useState } from "react";

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUploader = ({ value, onChange }: ImageUploaderProps) => {
  const fileInputEle = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  };

  const [progress, setProgress] = useState<number>(0);

  return (
    <div className="rounded-md w-full h-[200px]">
      {!value ? (
        <div className="h-full bg-white flex items-center justify-center flex-col">
          <input ref={fileInputEle} type="file" hidden onChange={(e) => {}} />
          <ImagePlusIcon
            className="text-gray-500"
            onClick={() => fileInputEle.current?.click()}
          />
          <p>% {progress}.00</p>
        </div>
      ) : (
        <div className="h-full bg-white flex items-center justify-center">
          <img src={value} className="object-cover" alt="" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
