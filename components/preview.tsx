"use client";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

interface PreviewProps {
  value: string;
}

export function Preview({ value }: PreviewProps) {
  const ReactQuill = useMemo(() => {
    return dynamic(() => import("react-quill"), { ssr: false });
  }, []);

  return (
    <div className="bg-background  rounded-md">
      <ReactQuill theme="bubble" value={value} readOnly className="text-muted-foreground" />
    </div>
  );
}
