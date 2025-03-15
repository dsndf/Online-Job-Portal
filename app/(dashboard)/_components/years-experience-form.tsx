"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/combo-box";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  yearsOfExperience: z
    .string({
      required_error: "Please select the years of experience.",
    })
    .min(1, "Please select the years of expericence."),
});

type Option = {
  label: string;
  value: string;
};
const options: Option[] = [
  {
    label: "Fresher",
    value: "0",
  },
  {
    label: "Entry Level (0-1 years)",
    value: "0-1",
  },
  {
    label: "Junior (1-3 years)",
    value: "1-3",
  },
  {
    label: "Mid Level (3-5 years)",
    value: "3-5",
  },
  {
    label: "Senior (5+ years)",
    value: "5-plus",
  },
];

interface YearsOfExperienceFormProps {
  initialData: string;
  jobId: string;
}
const YearsOfExperienceForm = ({
  initialData,
  jobId,
}: YearsOfExperienceFormProps) => {
  const router = useRouter();
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yearsOfExperience: initialData || "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const changeEditToggle = () => setEditToggle(!editToggle);

  const currentYearsOfExperience = options.find(
    (v) => v.value === initialData
  )?.label;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.put("/api/jobs/" + jobId, values);
      changeEditToggle();
      toast.success("Job updated");
      router.refresh();
    } catch (error) {
      toast.error("Failed to edit job years of experience.");
      console.log(error);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          className="border border-border bg-secondary/20 shadow-sm p-4 rounded-md w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex justify-between items-center">
                  <FormLabel className="text-md font-semibold">
                    Job Years of Experience
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
                    <Combobox options={options} {...field} />
                  ) : (
                    <h4 className="text-sm text-muted-foreground">
                      {currentYearsOfExperience ||
                        "No years of experience selected."}
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

export default YearsOfExperienceForm;
