import { fetchNoteById } from "@/app/lib/data";
import { formatDateString } from "@/app/lib/formatDate";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteButton from "@/app/ui/deleteButton";
import EditNote from "@/app/ui/edit-form";

export const metadata: Metadata = {
  title: "View Notes",
};

export default async function Note({
  params,
}: {
  params: { note_id: string };
}) {
  const id = params.note_id;
  const { title, body, date } = await fetchNoteById(id);

  if (!title) {
    notFound();
  }

  return (
    <div className="max-w-screen-2xl m-auto grid gap-8 p-6">
      <div className="bg-slate-50 p-4 border border-gray-300 rounded">
        <h2 className="text-gray-800 text-2xl font-semibold">{title}</h2>
        <p className="text-medium mt-2">{body}</p>
        <div className="mt-4 flex items-center justify-between gap-8">
          <p className="text-sm">
            <small>{formatDateString(date)}</small>
          </p>
          <div className="flex  gap-4">
            <DeleteButton id={id} />
            <EditNote id={id} title={title} body={body} />
          </div>
        </div>
      </div>
      <Link
        className="bg-blue-500 text-white px-3 py-1 text-base font-medium rounded fixed bottom-8 right-8  sm:bottom-16 sm:right-16"
        href="/"
      >
        back
      </Link>
    </div>
  );
}
