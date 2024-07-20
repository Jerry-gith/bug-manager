import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const bugData = await request.json();
    const { id } = bugData;

    const getBug = await prisma.bug.findUnique({
      where: { id: parseInt(id) },
      select: {
        title: true,
        description: true,
      },
    });

    if (!getBug) {
      return NextResponse.json({ message: "Bug not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: id,
      title: getBug.title,
      description: getBug.description,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
