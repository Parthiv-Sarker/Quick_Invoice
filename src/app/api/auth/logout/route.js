import { NextResponse } from "next/server";
import jwtService from "@/lib/jwtService";

export async function POST() {
    let response = NextResponse.json(
        { message: "Logout successful." },
        { status: 200 }
    );
    return jwtService.deleteToken(response);
}
