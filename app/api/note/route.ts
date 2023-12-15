import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2/promise";
import { db } from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    const connection = await db;
    const { title, body } = await request.json();

    await connection.execute<ResultSetHeader>(
      "INSERT INTO note (title, body) VALUES (?, ?)",
      [title, body]
    );
    return NextResponse.json(
      { message: "Created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating note" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const connection = await db;
    const [notes] = await connection.query("SELECT * FROM note");

    return Response.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching notes" },
      { status: 500 }
    );
  }
}
