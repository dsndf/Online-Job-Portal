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

// Props for the TitleForm component
interface TitleFormProps {
  initialData: string; // Initial title value
  jobId: string; // Job ID for API updates
}

// Define schema for form validation using Zod
const formSchema = z.object({
  title: z.string().min(1, "Title is required"), // Ensure title is not empty
});

const TitleForm = ({ initialData, jobId }: TitleFormProps) => {
  // Local state to toggle between edit and view modes
  const [editToggle, setEditToggle] = useState<boolean>(false);

  // Next.js router for page refreshes
  const router = useRouter();

  // Initialize react-hook-form with Zod validation and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData,
    },
  });

  // Destructure isSubmitting for better readability
  const {
    formState: { isSubmitting },
  } = form;

  // Toggle the edit mode
  const changeEditToggle = () => setEditToggle((prev) => !prev);

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Update job title via API
      await axios.put(`/api/jobs/${jobId}`, values);

      // Toggle edit mode off and refresh the page
      changeEditToggle();
      toast.success("Job updated");
      router.refresh();
    } catch (error) {
      // Handle errors and display a toast notification
      toast.error("Failed to edit job title.");
      console.error(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="border border-border bg-secondary/20 shadow-sm p-4 rounded-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Form field for the job title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex justify-between items-center">
                  {/* Form label */}
                  <FormLabel className="text-md font-semibold">
                    Job Title
                  </FormLabel>
                  {/* Edit/Cancel toggle button */}
                  <div
                    onClick={changeEditToggle}
                    className="flex items-center gap-1 font-semibold text-sm cursor-pointer"
                  >
                    {!editToggle ? (
                      <>
                        <Pencil className="h-4 w-4" /> Edit
                      </>
                    ) : (
                      "Cancel"
                    )}
                  </div>
                </div>

                {/* Input field or static title based on editToggle */}
                <FormControl>
                  {editToggle ? (
                    <Input
                      className="font-medium "
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

          {/* Submit button, visible only in edit mode */}
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
