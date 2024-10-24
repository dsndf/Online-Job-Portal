"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
interface TitleFormProps {
  initialData: string;
  jobId: string;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const TitleForm = ({ initialData, jobId }: TitleFormProps) => {
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData,
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const changeEditToggle = () => setEditToggle(!editToggle);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      await axios.patch("/api/jobs/" + jobId, values);
      changeEditToggle();
      toast.success("Job updated");
      router.refresh();
    } catch (error) {
      console.log(error);
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex justify-between items-center">
                  <FormLabel className="text-[16px] font-semibold">
                    Job Title
                  </FormLabel>
                  <div
                    onClick={changeEditToggle}
                    className="flex items-center gap-1 text-sm"
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
                    <Input
                      className="font-medium bg-white"
                      placeholder="e.g Full Stack Web Developer"
                      {...field}
                    />
                  ) : (
                    <h4 className="text-sm">{field.value}</h4>
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

export default TitleForm;
