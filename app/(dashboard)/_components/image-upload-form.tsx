"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import ImageUploader from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/firebase/config";
import toast from "react-hot-toast";
import axios from "axios";

const formSchema = z.object({
  imageUrl: z.string().min(1, "Please upload a job image."),
});

interface ImageUploadFormProps {
  initialData: string;
  jobId: string;
}

const ImageUploaderForm = ({ initialData, jobId }: ImageUploadFormProps) => {
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [storagePath, setStoragePath] = useState<string>("");

  const onStoragePathChange = (value: string) => setStoragePath(value);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const changeEditToggle = () => setEditToggle(!editToggle);

  const onCancel = async () => {
    try {
      if (storagePath) {
        const deleteRef = ref(storage, storagePath);
        await deleteObject(deleteRef);
        form.reset({ imageUrl: "" });
      }
      changeEditToggle();
    } catch (error) {
      toast.error("Failed to delete a image file from storage.");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await axios.put("/api/jobs/" + jobId, values, {
        withCredentials: true,
      });
      router.refresh();
      changeEditToggle();
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit job image.");
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          className="bg-gray-200 p-4 rounded-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex justify-between items-center">
                  <FormLabel className="text-[16px] font-semibold">
                    Job Image
                  </FormLabel>
                  <div
                    onClick={!editToggle ? changeEditToggle : onCancel}
                    className="flex items-center gap-1 font-semibold text-sm"
                  >
                    {!editToggle ? (
                      <>
                        {" "}
                        <Pencil className="h-4 w-4" /> Edit
                      </>
                    ) : (
                      "Cancel"
                    )}
                  </div>
                </div>

                <FormControl>
                  {editToggle ? (
                    <ImageUploader
                      {...field}
                      onStoragePathChange={onStoragePathChange}
                    />
                  ) : (
                    <div className="rounded-md w-full h-[200px] overflow-hidden bg-white">
                      <img src={field.value} className="w-full h-full" alt="" />
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {editToggle && (
            <div className="flex items-center justify-start pt-4">
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ImageUploaderForm;
