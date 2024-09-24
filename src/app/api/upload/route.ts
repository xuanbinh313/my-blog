import { promises } from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = req.formData();
    const file = (await formData).get("file") as File;
    console.log(file);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await promises.writeFile(`./public/assets/${file.name}`, buffer);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

// import fs from "fs";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File;
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     await fs.promises.writeFile(`./public/uploads/${file.name}`, buffer);
//     return NextResponse.json({ success: true });
//   } catch (e) {
//     return NextResponse.json({ success: false, error: e });
//   }
// }
