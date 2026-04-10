import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
    const from = await request.formData();
    const file = from.get("file") as File;

    if (file.size === 0 || file.size === undefined) {
        return NextResponse.json({ message: "file is required" }, { status: 400 });
    }
    if (file.size > 4000000) {
        return NextResponse.json({ message: "file must be less than 4MB" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
        return NextResponse.json({ message: "file must be an image" }, { status: 400 });
    }

    const blob = await put(file.name, file, {
        access: "public",
        multipart: true,
    });
    return NextResponse.json(blob);
}

export const DELETE = async (request: Request) => {
    try {
        const { url } = await request.json();
        if (!url) {
            return NextResponse.json({ message: "URL is required" }, { status: 400 });
        }
        await del(url);
        return NextResponse.json({ message: "Image deleted successfully" });
    } catch {
        return NextResponse.json({ message: "Failed to delete image" }, { status: 500 });
    }
}