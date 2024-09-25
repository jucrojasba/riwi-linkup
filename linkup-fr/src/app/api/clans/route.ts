import { NextRequest, NextResponse } from "next/server";
import { getClansService } from "../services/clanService";

// GET method to retrieve clans
export async function GET(_: NextRequest) {
    try {
        const data = await getClansService();
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error with GET CLANS" }, { status: 500 });
    }
}
