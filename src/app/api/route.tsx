import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    return NextResponse.json({
        message: 'Olá mundo!'
    })
}

export async function GET() {

    return NextResponse.json({
        message: 'Olá mundo!'
    })
}

