import { NextRequest, NextResponse } from "next/server";
import { editBugSchema } from "../../Schema";
import prisma from "@/prisma/client";

// export async function PATCH(request: NextRequest, {params}: {params: {id: string}}) {
//     const bugData = await request.json();
//     const validatedBugData = editBugSchema.safeParse(bugData);

//     if (!!!validatedBugData.success)
//         return NextResponse.json(
//           { message: validatedBugData.error.format() },
//           { status: 400 }
//         );

      

// }

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const bug = await prisma.bug.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!bug) return NextResponse.json({ error: "Invalid Bug" }, { status: 404 });

  await prisma.bug.delete({
    where: { id: bug.id },
  })

  return NextResponse.json({message: "Bug deleted successfully!"})
}
