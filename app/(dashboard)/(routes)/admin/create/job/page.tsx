"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CreateJob = () => {
  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(1, { message: "Job title cannot be empty." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  /**
   * Handles job create form submit.
   * @param values
   */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post("/api/jobs", values, {
        withCredentials: true,
      });
      router.push(`/admin/jobs/${data.job?.id}`);
      toast.success("Job created successfully.");
    } catch (error) {
      console.log((error as Error).message);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-full flex justify-center items-center  p-6">
      <div>
        {" "}
        <h3 className="text-xl font-semibold">Name your job</h3>
        <p className="text-sm">
          What would you like to name your job? Don't worry you can change it
          later.
        </p>
        <br />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Job Title</FormLabel>
                  <FormControl>
                    <Input
                      className="font-medium"
                      placeholder="e.g Full Stack Web Developer"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Role for this job.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-start gap-2">
              {" "}
              <Button type="button" variant={"ghost"}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateJob;
