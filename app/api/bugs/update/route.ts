import { NextRequest, NextResponse } from "next/server";

export default async function GET(request: NextRequest) {
    const bugID = await request.json()
    // const {id} = bugID
    console.log(JSON.stringify( bugID))


    // const { searchParams } = new URL(request.url);
    // const id = searchParams.get('id');
    
    // console.log("The bug:", id);
    // // return NextResponse.json({ id });
}

