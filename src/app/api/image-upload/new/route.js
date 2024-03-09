import { NextResponse } from "next/server";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { join } from "path";
import { v4 as uuidv4 } from "uuid"; // Import the v4 function from the uuid library
const pump = promisify(pipeline);

export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const file = formData.getAll("files")[0];
    const fileExtension = file.name.split(".").pop(); // Get file extension
    const uniquePrefix = uuidv4(); // Generate a unique serial number prefix
    const fileName = `${uniquePrefix}.${fileExtension}`; // Concatenate unique prefix with file extension
    const filePath = join(process.cwd(), "public", "file", fileName);

    // Create directory if it doesn't exist
    const directory = join(process.cwd(), "public", "file");
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    await pump(file.stream(), fs.createWriteStream(filePath));
    const fileUrl = `/file/${fileName}`;

    return NextResponse.json({
      status: "success",
      res: fileUrl,
    });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
