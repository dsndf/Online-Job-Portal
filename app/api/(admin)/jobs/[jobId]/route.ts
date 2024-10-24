import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export const PATCH = async (
  req: Request,
  { params }: { params: { jobId: string } }
) => {
  try {
    const user = auth();
    const data = await req.json();
    const jobId = params.jobId;
    if (!user?.userId)
      return NextResponse.json("Un-Authorized", { status: 401 });
    if (!jobId) return NextResponse.json("Job id is missing", { status: 400 });
    if (!data) return NextResponse.json("Data is missing", { status: 400 });
    const updatedData = await db.job.update({
      where: {
        id: jobId,
      },
      data,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(`[JOB PATCH] error `, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
