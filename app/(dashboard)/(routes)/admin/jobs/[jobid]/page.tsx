import CategoryForm from "@/app/(dashboard)/_components/category-form";
import JobPublishAction from "@/app/(dashboard)/_components/job-publish-action";
import TitleForm from "@/app/(dashboard)/_components/title-form";
import Banner from "@/components/banner";
import IconBadge from "@/components/icon-badge";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { db } from "@/lib/db";
import ImageUploaderForm from "@/app/(dashboard)/_components/image-upload-form";
import ShortDescriptionForm from "@/app/(dashboard)/_components/short-description-form";
import ShiftTimingForm from "@/app/(dashboard)/_components/shift-timing-form";
import HourlyRateForm from "@/app/(dashboard)/_components/hourly-rate-form";
import WorkModeForm from "@/app/(dashboard)/_components/work-mode";
import YearsOfExperienceForm from "@/app/(dashboard)/_components/years-experience-form";
import DescriptionForm from "@/app/(dashboard)/_components/description-form";

const JobEditDetailsPage = async ({
  params: { jobid },
}: {
  params: { jobid: string };
}) => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  // use regex expression to check valid mongodb JOB ID;

  const job = await db?.job.findUnique({
    where: {
      id: jobid,
      userId,
    },
  });
  const categories = await db?.category.findMany();

  if (!job) return redirect("/admin/jobs");

  const requiredFields = [job?.title, job?.imageUrl, job?.description];
  const completedFields = requiredFields.filter(Boolean).length;
  const isComplete = requiredFields.every(Boolean);
  const totalFields = requiredFields.length;

  return (
    <div className="p-6">
      <div>
        <Link
          href={"/admin/jobs"}
          className="flex text-sm items-center justify-start gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="mt-4">
          <h1 className="text-xl mb-2 font-semibold">Job Setup</h1>
          <p className="text-muted-foreground">
            Complete All Fields ({completedFields}/{totalFields})
          </p>
        </div>
        <JobPublishAction
          disabled={!isComplete}
          jobId={jobid}
          isPublish={job.isPublished}
        />
      </div>
      <Banner label="This job is not published" />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-16">
        <div>
          <div className="flex justify-start items-center gap-2 mb-4">
            <IconBadge icon={LayoutDashboard} />
            <h5 className="text-lg">Customize your job</h5>
          </div>

          <TitleForm initialData={job.title} jobId={jobid} />
          <br />
          <CategoryForm
            initialData={job.categoryId || ""}
            jobId={jobid}
            options={
              categories
                ? categories.map((v) => ({ label: v.name, value: v.id }))
                : []
            }
          />
          <br />
          <ImageUploaderForm jobId={jobid} initialData={job.imageUrl || ""} />
          <br />
          <ShortDescriptionForm
            jobId={jobid}
            initialData={job.short_description || ""}
          />
          <br />
          <ShiftTimingForm
            initialData={job?.shiftTiming || ""}
            jobId={job?.id}
          />
          <br />
          <HourlyRateForm initialData={job?.hourlyRate || ""} jobId={job?.id} />
          <br />
          <WorkModeForm initialData={job?.workMode || ""} jobId={job?.id} />
          <br />
          <YearsOfExperienceForm
            initialData={job?.yearsOfExperience || ""}
            jobId={job?.id}
          />
        </div>{" "}
      </div>{" "}
      <br />
      <DescriptionForm initialData={job?.description || ""} jobId={job?.id} />
    </div>
  );
};

export default JobEditDetailsPage;
