import prisma from "@/prisma/client"
import { createBugSchema } from "../Schema"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request:NextRequest) {
    const bugData = await request.json()
    const validatedBugData =  createBugSchema.safeParse(bugData)

    if(!!!validatedBugData.success)
        return NextResponse.json({message: validatedBugData.error.errors}, {status: 400})

    const newBug = await prisma.bug.create({
        data: {title: bugData.title, description: bugData.description}
    })
    return NextResponse.json(newBug, {status: 201})
} 