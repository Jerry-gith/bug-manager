import { NextRequest, NextResponse } from "next/server";
import { patchBugSchema } from "../../Schema";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const editedBugData = await request.json();
  const validatedBugData = patchBugSchema.safeParse(editedBugData);

  if (!!!validatedBugData.success)
    return NextResponse.json(
      { error: validatedBugData.error.format() },
      { status: 400 }
    );

  const { userId, title, description } = editedBugData;

  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  const bug = prisma.bug.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!bug) return NextResponse.json({ error: "Invalid Bug" }, { status: 404 });

  try {
    const bugID = parseInt(params.id);
    const updatedBug = await prisma.bug.update({
      where: { id: bugID },
      data: {
        title,
        description,
        userId,
      },
    });

    return NextResponse.json(
      { message: "Bug successfully updated!", updatedBug },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating bug:", error);
    return NextResponse.json({ message: `Internal server error: ${error}` });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const bug = await prisma.bug.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!bug) return NextResponse.json({ error: "Invalid Bug" }, { status: 404 });

  try {
    await prisma.bug.delete({
      where: { id: bug.id },
    });

    return NextResponse.json({ message: "Bug deleted successfully!" });
  } catch (error) {
    console.error("Error deleting bug:", error);
    return NextResponse.json({ message: `Internal server error: ${error}` });
  }
}
