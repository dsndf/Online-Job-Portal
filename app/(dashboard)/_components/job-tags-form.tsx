"use client";

//Imports validation utilities
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Import ui components and icons
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { LightbulbIcon, Pencil, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateGeminiResponse } from "@/scripts/gemini";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

// Form schema
const formSchema = z.object({
  tags: z.string().array(),
});

// Props
interface JobTagsFormProps {
  jobId: string;
  initialData: string[];
}

const JobTagsForm = ({ jobId, initialData }: JobTagsFormProps) => {
  //Hook states
  const router = useRouter();
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [generatingRes, setGeneratingRes] = useState<boolean>(false);

  // Initialize form state with zod schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: initialData,
    },
  });

  const generateTagsUsingGemini = async () => {
    if (!jobTitle.length) {
      toast.error("Please enter profession name.");
      return;
    }
    setGeneratingRes(true);
    try {
      const result = await generateGeminiResponse(
        `Generate a JSON array of 10 relevant job requirement tags for the ${jobTitle} profession. Ensure the output is strictly a JSON array of strings without any additional text or explanation. `
      );
      form.setValue("tags", JSON.parse(result.replace(/json/gi, "")));
    } catch (error) {
      console.log(error);
    } finally {
      setGeneratingRes(false);
    }
  };

  const removeTagByIndex = (index: number) => {
    const currentTags = form.getValues().tags;
    const remainedTags = currentTags.filter((tag, ind) => {
      return ind !== index;
    });
    form.setValue("tags", remainedTags);
  };
  /**
   * Handles form submission
   * @param values
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.put("/api/jobs/" + jobId, values);
      changeEditToggle();
      toast.success("Job updated");
      router.refresh();
      setJobTitle("");
    } catch (error) {
      toast.error("Failed to edit job tags.");
      console.log(error);
    }
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
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <div className="w-full flex justify-between items-center">
                      {/* Form label */}
                      <FormLabel className="text-md font-semibold">
                        Create job tags using Google GenAI
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
                  </div>

                  {/* Input field or static shortDescription based on editToggle */}
                  <FormControl>
                    {editToggle ? (
                      <div className="space-y-2">
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
                            onClick={generateTagsUsingGemini}
                          >
                            <LightbulbIcon className="" />
                          </Button>
                        </div>
                        <FormDescription className="text-right">
                          Note: Profession name is enough to generate tags.
                        </FormDescription>

                        <div className="flex justify-start items-center gap-2 flex-wrap min-w-fit">
                          {field.value.map((tag, index) => (
                            <div
                              key={tag}
                              className="rounded-md bg-secondary gap-4 p-2 h-fit text-xs flex justify-between items-center"
                            >
                              <p>{tag}</p>
                              <Button
                                disabled={generatingRes}
                                onClick={() => removeTagByIndex(index)}
                                className="p-1  hover:bg-transparent bg-transparent m-0 h-fit w-fit "
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : initialData.length ? (
                      <div className="flex justify-start items-center gap-2 flex-wrap min-w-fit">
                        {initialData.map((tag, index) => (
                          <div
                            key={tag}
                            className="rounded-md bg-secondary gap-4 p-2 h-fit text-xs flex justify-between items-center"
                          >
                            <p>{tag}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <h4 className="text-sm text-muted-foreground">
                        No Tags.
                      </h4>
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

export default JobTagsForm;
