"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface EditNoteprops {
  id: string;
  title: string;
  body: string;
}

export default function EditNote({ id, title, body }: EditNoteprops) {
  const [editnote, setEditnote] = useState({
    title: title,
    body: body,
  });

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setEditnote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/api/note/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editnote),
      });

      // Close the dialog after submitting
      closeDialog();
      router.refresh();
    } catch (error) {
      console.log("Error editing note:", error);
    }
  }

  return (
    <>
      <dialog className="bg-slate-100 p-4 rounded-md" ref={dialogRef}>
        <button
          className="bg-blue-400 p-1 rounded-[50%] ml-auto block hover:bg-blue-500"
          type="button"
          onClick={closeDialog}
        >
          <Image
            src="/close-icon.svg"
            alt="close_icon"
            width={10}
            height={10}
          />
        </button>
        <form className=" grid gap-4 w-[20rem]">
          <label
            className="grid gap-1 text-base font-medium text-gray-600"
            htmlFor="title"
          >
            Title
            <input
              className="px-3 py-3 rounded-md border border-gray-300 bg-white text-sm text-gray-700  outline-blue-600 sm:py-2"
              type="text"
              name="title"
              id="title"
              spellCheck
              onChange={handleChange}
              value={editnote.title}
              required
            />
          </label>
          <label
            className="grid gap-1 text-base font-medium text-gray-600"
            htmlFor="body"
          >
            Body
            <textarea
              className="px-3 py-3 rounded-md border border-gray-300 bg-white text-sm text-gray-700  outline-blue-600 sm:py-2"
              name="body"
              id="body"
              placeholder="Write something..."
              rows={10}
              onChange={handleChange}
              value={editnote.body}
            ></textarea>
          </label>
          <button
            className="bg-blue-500 text-white text-base font-medium py-3 rounded-md sm:py-2"
            type="submit"
            onClick={handleSubmit}
          >
            Edit
          </button>
        </form>
      </dialog>
      <button
        className=" text-blue-500 border border-gray-300 rounded px-3 py-1 text-base font-medium "
        onClick={openDialog}
      >
        Edit
      </button>
    </>
  );
}
