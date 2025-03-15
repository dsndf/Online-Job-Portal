import React from "react";
import { DataTable } from "./jobs_data_table/data-table";
import { columns, JobData } from "./jobs_data_table/columns";
import { db } from "@/lib/db";
const Jobs = async () => {
  const jobs = await db?.job.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log({ jobs });
  const data =
    jobs?.map((job): JobData => {
      return {
        title: job.title,
        category: job.category?.name || "NA",
        createdAt: job.createdAt,
        company: "NA",
        published: job.isPublished,
        id: job.id,
      };
    }) || [];
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Jobs;
