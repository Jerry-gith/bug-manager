import { editBugSchema } from "@/app/api/Schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const editedBugData = await request.json();
  const validatedBugData = editBugSchema.safeParse(editedBugData);

  if (!!!validatedBugData.success)
    return NextResponse.json(
      { message: validatedBugData.error.format() },
      { status: 400 }
    );

  try {
    const bugID = parseInt(editedBugData.id) 
    await prisma.bug.update({
      where: { id: bugID },
      data: {
        id: bugID,
        title: editedBugData.title,
        description: editedBugData.description,
      },
    });

    return NextResponse.json(
      { message: "Bug successfully updated!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating bug:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}