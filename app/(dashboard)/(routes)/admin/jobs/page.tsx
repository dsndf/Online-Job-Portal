import Jobs from "@/app/(dashboard)/_components/jobs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const JobsOverviewPage = async () => {
  return (
    <div className="h-full p-6 space-y-4">
      <div className="flex justify-end ">
        <Link href={"/admin/create/job"}>
          <Button>
            <Plus className="w-4 h-5 mr-2" /> New Job
          </Button>
        </Link>
      </div>
      {/* Jobs Data Table */}
      <Jobs />
    </div>
  );
};

export default JobsOverviewPage;
