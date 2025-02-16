import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const JobsPage = () => {
  return (
    <div className="h-full">
      <div className="flex justify-end p-6">
        <Link href={"/admin/create/job"}>
          <Button>
            <Plus className="w-4 h-5 mr-2" /> New Job
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JobsPage;
