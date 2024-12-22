import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    if (!userId) return new NextResponse("Un-Authorized", { status: 401 });
    if (!title) return new NextResponse("Title is missing", { status: 400 });

    const job = await db.job.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json({ job }, { status: 201 });

  } catch (error) {
    console.log(`[JOB POST] error `, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
