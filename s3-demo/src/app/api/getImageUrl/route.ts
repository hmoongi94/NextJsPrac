import { NextResponse } from "next/server";
import pool from "@/app/database";

export async function GET() {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      "SELECT urlname FROM imageurl"
    );
    conn.release();

    console.log(rows)
    // if (!Array.isArray(rows)) {
    //   throw new Error("Rows is not an array");
    // }

    const imageUrls = [rows].map((row: { urlname: any }) => row.urlname);

    return NextResponse.json({ success: true, imageUrls });
  } catch (error) {
    console.error("Error fetching image URLs from database", error);
    return NextResponse.json({
      error: "Error fetching image URLs from database",
    });
  }
}
