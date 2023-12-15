import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { db } from "@/app/lib/db";

export async function GET(request: NextRequest) {
  try {
    const connection = await db;
    const noteId = request.url.split("/note/")[1];

    const [note] = await connection.query<RowDataPacket[]>(
      "SELECT title, body, date FROM note WHERE note_id = ?",
      [noteId]
    );

    if (!note.length) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    const singleNote = note[0];
    return NextResponse.json(singleNote, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching notes" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const connection = await db;
    const noteId = request.url.split("/note/")[1];
    const { title, body } = await request.json();

    const [result] = await connection.execute<ResultSetHeader>(
      "UPDATE note SET `title` = ?, `body` = ? WHERE note_id = ?",
      [title, body, noteId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Successfully updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing note:", error);
    return NextResponse.json(
      { message: "Error editing note" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const connection = await db;
    const noteId = request.url.split("/note/")[1];

    const [result] = await connection.execute<ResultSetHeader>(
      "DELETE FROM note WHERE note_id = ?",
      [noteId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { message: "Error deleting note" },
      { status: 500 }
    );
  }
}
