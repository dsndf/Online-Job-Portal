"use client";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (e: any) => void;
}
export function Editor({ value, onChange }: EditorProps) {
  const ReactQuill = useMemo(() => {
    return dynamic(() => import("react-quill"), { ssr: false });
  }, []);

  return (
    <div className="bg-background">
      <ReactQuill theme="snow" value={value} onChange={onChange}  />
    </div>
  );
}
