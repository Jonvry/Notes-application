import { fetchNotes } from "@/app/lib/data";
import Link from "next/link";
import CreateNote from "@/app/ui/create-form";
import { Metadata } from "next";
import { formatDateString } from "@/app/lib/formatDate";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface Notesprops {
  title: string;
  date: string;
  note_id: string;
}

export const metadata: Metadata = {
  title: "Notes",
};

export default async function Home() {
  const getNotes = await fetchNotes();

  return (
    <main className="max-w-screen-2xl m-auto p-6">
      <h2 className="text-gray-800 text-2xl font-semibold">Notes</h2>
      <CreateNote />
      <div className="mt-4 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {getNotes?.map((note: Notesprops) => (
          <div
            key={note.note_id}
            className="bg-slate-50 border border-gray-300 p-4 rounded w-full"
          >
            <Link href={`/note/${note.note_id}`}>
              <h3 className="text-lg font-semibold">{note.title}</h3>
            </Link>
            <p className="text-sm mt-4">
              <small>{formatDateString(note.date)}</small>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
