import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import pool from "@/app/database";

interface FormDataFile {
  arrayBuffer(): Promise<ArrayBuffer>;
  name: string;
}

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!,
  },
});

async function uploadFileToS3(file: Buffer, fileName: string): Promise<string> {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
    Key: `exerciseApp/${fileName}-${Date.now()}`,
    Body: file,
    ContentType: "image/jpeg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/exerciseApp/${params.Key}`; // S3에 업로드된 이미지의 URL
  return imageUrl;
}

export async function POST(request: {
  formData: () => Promise<{ get: (arg0: string) => FormDataFile }>;
}) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const imageUrl = await uploadFileToS3(buffer, file.name);

    // mariadb에 url저장하기
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query("INSERT INTO imageurl (urlname) VALUES (?)", [
        imageUrl,
      ]);
      conn.release(); 
    } catch (error) {
      console.error("Error saving data to MariaDB", error);
      if (conn) conn.release(); 
      return NextResponse.json({ error: "Error saving data to MariaDB" });
    }

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    return NextResponse.json({ error: "Error uploading file" });
  }
}
