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
  shiftTiming: z
    .string({
      required_error: "Please select a shift timing.",
    })
    .min(1, "Please select a shift timinig"),
});

type Option = {
  label: string;
  value: string;
};

const options: Option[] = [
  {
    label: "Full time",
    value: "full-time",
  },
  {
    label: "Part time",
    value: "part-time",
  },
  {
    label: "Contract",
    value: "contract",
  },
];

interface ShiftTimingFormProps {
  initialData: string;
  jobId: string;
}
const ShiftTimingForm = ({ initialData, jobId }: ShiftTimingFormProps) => {
  const router = useRouter();
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shiftTiming: initialData || "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const changeEditToggle = () => setEditToggle(!editToggle);

  const currentShiftTiming = options.find(
    (v) => v.value === initialData
  )?.label;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.put("/api/jobs/" + jobId, values);
      changeEditToggle();
      toast.success("Job updated");
      router.refresh();
    } catch (error) {
      toast.error("Failed to edit job category.");
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
            name="shiftTiming"
            render={({ field }) => (
              <FormItem>
                <div className="w-full flex justify-between items-center">
                  <FormLabel className="text-md font-semibold">
                    Job Shift timing mode
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
                      {currentShiftTiming || "No category selected."}
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

export default ShiftTimingForm;
