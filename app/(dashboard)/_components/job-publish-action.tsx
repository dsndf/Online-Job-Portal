"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { useState } from "react";

type JobPublishActionProps = {
  isPublish: boolean;
  disabled: boolean;
  jobId: string;
};

const JobPublishAction = ({
  disabled,
  isPublish,
  jobId,
}: JobPublishActionProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const onClick = ()=>{}
  const onDelete = ()=>{}

  return (
    <div className="flex gap-2 justify-end items-center">
      <Button disabled={disabled || isLoading}>Publish</Button>
      <Button disabled={isLoading} size={"icon"} variant={"destructive"}>
        <Trash className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default JobPublishAction;
