"use client";

//Imports validation utilities
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Import ui components and icons
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { LightbulbIcon, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateGeminiResponse } from "@/scripts/gemini";
import toast from "react-hot-toast";

// Form schema
const formSchema = z.object({
  short_description: z.string().min(1, "Short description is required"),
});

// Props
interface ShortDescriptionFormProps {
  jobId: string;
  initialData: string;
}

const ShortDescriptionForm = ({
  jobId,
  initialData,
}: ShortDescriptionFormProps) => {
  //Hook states
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [generatingRes, setGeneratingRes] = useState<boolean>(false);

  // Initialize form state with zod schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      short_description: initialData,
    },
  });

  const generateShortDescriptionUsingGemini = async () => {
    if (!jobTitle.length) {
      toast.error("Please enter job title.");
      return;
    }
    setGeneratingRes(true);
    try {
      const result = await generateGeminiResponse(
        `Generate a 20 to 30 words short description for the job ${jobTitle}.`
      );
      console.log({ result });
      form.setValue("short_description", result);
    } catch (error) {
      console.log(error);
    } finally {
      setGeneratingRes(false);
    }
  };

  /**
   * Handles form submission
   * @param values
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
    } catch (error) {}
  };
  const changeEditToggle = () => setEditToggle(!editToggle);

  return (
    <div>
      <div>
        <Form {...form}>
          <form
            className="border border-border bg-secondary/20 shadow-sm p-4 rounded-md"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Form field for the job shortDescription */}
            <FormField
              control={form.control}
              name="short_description"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex justify-between items-center">
                    {/* Form label */}
                    <FormLabel className="text-md font-semibold">
                      Job Short Description
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

                  {/* Input field or static shortDescription based on editToggle */}
                  <FormControl>
                    {editToggle ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center gap-2">
                          <Input
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="e.g Full Stack Web Developer"
                          />
                          <Button
                            type="button"
                            size={"icon"}
                            disabled={generatingRes}
                            onClick={generateShortDescriptionUsingGemini}
                          >
                            <LightbulbIcon className="" />
                          </Button>
                        </div>

                        <Textarea
                          rows={5}
                          {...field}
                          placeholder="Write a short description"
                        />
                      </div>
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
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Save
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ShortDescriptionForm;
