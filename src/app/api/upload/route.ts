import { promises } from "fs";
import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Resize the image using sharp
    const resizedBuffer = await sharp(buffer)
      .resize(800, 600) // Example dimensions, adjust as needed
      .toBuffer();

    await promises.writeFile(`./public/assets/${file.name}`, resizedBuffer);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}