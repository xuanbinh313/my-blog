import { promises } from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = req.formData();
    const file = (await formData).get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await promises.writeFile(`./public/upload/${file.name}`, buffer);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
