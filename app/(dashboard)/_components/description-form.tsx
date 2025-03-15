"use client";

import React, { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CopyIcon, Lightbulb, Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/combo-box";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { Input } from "@/components/ui/input";
import { generateGeminiResponse } from "@/scripts/gemini";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  description: z
    .string({
      required_error: "Please enter a description.",
    })
    .min(1, "Please enter a description."),
});

interface DescriptionFormProps {
  initialData: string;
  jobId: string;
}
const DescriptionForm = ({ initialData, jobId }: DescriptionFormProps) => {
  const router = useRouter();
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [profession, setProfession] = useState<string>("");
  const [requiredSkills, setRequiredSkills] = useState<string>("");
  const [generatingRes, setGeneratingRes] = useState<boolean>(false);
  const [aiValue, setAiValue] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData || "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const changeEditToggle = () => setEditToggle(!editToggle);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log({values})
      await axios.put("/api/jobs/" + jobId, values);
      changeEditToggle();
      toast.success("Job updated");
      router.refresh();
      setAiValue("");
    } catch (error) {
      toast.error("Failed to edit job hourly rate.");
      console.log(error);
    }
  };
  const generateDescriptionUsingGemini = async () => {
    if (!profession.length) {
      toast.error("Please enter profession name.");
      return;
    }
    setGeneratingRes(true);
    try {
      const result = await generateGeminiResponse(
        `Generate a professional job description based on the following details:Profession Name: [${profession}] Required Skills:[${requiredSkills}] Create a concise and engaging description highlighting key responsibilities, expertise, and industry relevance.`
      );
      const cleanedText = result.replace(/[#*]|"""/g, "");
      setAiValue(cleanedText);
      //   form.setValue("description", result);
    } catch (error) {
      console.log(error);
    } finally {
      setGeneratingRes(false);
    }
  };
  const copyAiValue = () => {
    navigator.clipboard
      .writeText(aiValue)
      .then(() => toast.success("Copied to clipboard."))
      .catch((err) => console.error("Failed to copy: ", err));
  };
  return (
    <div className="">
      <Form {...form}>
        <form
          className="border border-border bg-secondary/20 shadow-sm p-4 rounded-md w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex justify-between items-center">
                  <FormLabel className="text-md font-semibold">
                    Job Description
                  </FormLabel>
                  <div
                    onClick={changeEditToggle}
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
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center gap-2">
                          <Input
                            placeholder="e.g 'Full Stack Developer'"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                          />
                          <Input
                            placeholder="e.g Required Skills sets"
                            value={requiredSkills}
                            onChange={(e) => setRequiredSkills(e.target.value)}
                          />
                          <Button
                            size="sm"
                            type="button"
                            disabled={generatingRes}
                            onClick={(e) => {
                              e.stopPropagation();
                              generateDescriptionUsingGemini();
                            }}
                          >
                            {generatingRes ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              <Lightbulb />
                            )}
                          </Button>
                        </div>
                        <FormDescription className="text-right ">
                          Note: Enter the profession name. Separate skills with
                          commas.
                        </FormDescription>
                      </div>
                      {aiValue && (
                        <div className="relative">
                          {" "}
                          <Button
                            size="icon"
                            className="top-0 right-0 absolute"
                            variant={"secondary"}
                            onClick={() => {
                              copyAiValue();
                            }}
                            type="button"
                          >
                            <CopyIcon className="w-4 h-4" />
                          </Button>
                          <Textarea value={aiValue} className="h-[300px]" />
                        </div>
                      )}
                      <Editor {...field} />
                    </div>
                  ) : field.value ? (
                    <Preview {...field} />
                  ) : (
                    <h4 className="text-sm text-muted-foreground">
                      No description provided.
                    </h4>
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

export default DescriptionForm;
