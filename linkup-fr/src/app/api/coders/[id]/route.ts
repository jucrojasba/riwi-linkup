import { NextRequest, NextResponse } from "next/server"; 
import { deleteCoder, getCoderById, updateCoder } from "../../services/coderService"; 

// GET method to fetch a coder by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: "ID is required to get the coder" }, { status: 400 });
    }
    const data = await getCoderById(parseInt(id));
    if (data && "message" in data) return NextResponse.json({ error: data }, { status: 500 });

    const { idCoder, name, birthday, description, urlImage, clanId, genderName, softSkills, languageLevels, technicalSkillLevels } = data;
    return NextResponse.json({
        success: "Coder retrieved successfully",
        data: { idCoder, name, birthday, description, urlImage, clanId, genderName, softSkills, languageLevels, technicalSkillLevels }
    });
}

// DELETE method to remove a coder by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: "ID is required to delete the coder" }, { status: 400 });
    }
    await deleteCoder(parseInt(id));
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
}

// PUT method to update a coder's information
export async function PUT(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
        const { id } = params;
        const coderUpdate = await req.json();
        if (!id || !coderUpdate) {
            return NextResponse.json({ message: "All parameters are required" }, { status: 400 });
        }
        const data = await updateCoder(coderUpdate, parseInt(id));
        return NextResponse.json({ message: "User updated successfully", data }, { status: 200 });
    } catch (error) {
        console.error("Error in PUT handler:", error);
        return NextResponse.json({ message: "Error updating coder" }, { status: 500 });
    }
}
