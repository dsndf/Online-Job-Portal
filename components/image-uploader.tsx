"use client";
import { storage } from "@/firebase/config";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ImagePlusIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  onStoragePathChange: (value: string) => void;
}

const ImageUploader = ({
  value,
  onChange,
  onStoragePathChange,
}: ImageUploaderProps) => {
  const [progress, setProgress] = useState<number>(0);
  const fileInputEle = useRef<HTMLInputElement | null>(null);

  const uploadImage = (file: File) => {
    const uuid = crypto.randomUUID();
    const storagePath = "hired/jobs/images/" + uuid;

    // set path for deletion operation of file from storage.
    onStoragePathChange(storagePath);

    const storageRef = ref(storage, storagePath);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressValue =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress((prev) => progressValue);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        onStoragePathChange("");
        toast.error("Failed to upload a image.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          onChange(downloadURL);
        });
      }
    );
  };

  /**
   * Handles image upload to firebase
   * @param e
   * @returns
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    alert();
    const file = e.target.files?.[0];
    if (!file) return;
    uploadImage(file);
  };

  return (
    <div className="rounded-md w-full h-[200px] overflow-hidden">
      {!value ? (
        <div className="h-full bg-white  flex items-center justify-center flex-col">
          <input
            ref={fileInputEle}
            type="file"
            hidden
            onChange={(e) => handleImageUpload(e)}
          />
          <ImagePlusIcon
            className="text-gray-500"
            onClick={() => fileInputEle.current?.click()}
          />
          <p className="text-gray-500">{progress}.00%</p>
        </div>
      ) : (
        <div className="h-full bg-white flex items-center justify-center">
          <img src={value} className="w-full h-full" alt="" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
