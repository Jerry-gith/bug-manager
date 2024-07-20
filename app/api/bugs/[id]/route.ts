import { NextRequest, NextResponse } from "next/server";
import { editBugSchema } from "../../Schema";

export async function PATCH(request: NextRequest, {params}: {params: {id: string}}) {
    const bugData = await request.json();
    const validatedBugData = editBugSchema.safeParse(bugData);

    if (!!!validatedBugData.success)
        return NextResponse.json(
          { message: validatedBugData.error.format() },
          { status: 400 }
        );
    
}