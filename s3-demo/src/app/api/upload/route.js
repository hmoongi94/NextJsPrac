import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY 
  },
});

async function uploadFileToS3(file, fileName){

    const fileBuffer = file;
    console.log(fileName);
    
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      key: `${fileName}-${Date.now()}`,
      Body: fileBuffer,
      ContentType: "image/jpeg"
    }

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return fileName;
}

export async function POST(request) {
  try {

    const formData = await request.formData();
    const file = formData.get("file");

    if(!file){
        return NextResponse.json({error: "File is required."}, {status:400})
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = await uploadFileToS3(buffer, file.name)

    return NextResponse.json({ succes: true, fileName});

  } catch (error) {
    return NextResponse.json({ error: "Error uploading file" });
  }
}
