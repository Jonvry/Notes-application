"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreateNote() {
  const [note, setNote] = useState({});
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://notes-jonvry.vercel.app/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      // Clear the form
      if (e.target instanceof HTMLFormElement) {
        e.target.reset();
      }

      // Close the dialog after submitting
      closeDialog();
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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
            width={10}
            height={10}
            alt="close_icon"
          />
        </button>
        <form onSubmit={handleSubmit} className=" grid gap-4 w-[20rem]">
          <label
            className="grid gap-1 text-base font-medium text-gray-600"
            htmlFor="title"
          >
            Title
            <input
              className="px-3 py-3 rounded-md border border-gray-300 bg-white text-sm text-gray-700 outline-blue-600 sm:py-2"
              type="text"
              name="title"
              id="title"
              maxLength={32}
              spellCheck
              onChange={handleChange}
              required
            />
          </label>
          <label
            className="grid gap-1 text-base font-medium text-gray-600"
            htmlFor="body"
          >
            Body
            <textarea
              className="px-3 py-3 rounded-md border border-gray-300 bg-white text-sm text-gray-700 outline-blue-600 sm:py-2"
              name="body"
              id="body"
              placeholder="Write something..."
              rows={10}
              onChange={handleChange}
            ></textarea>
          </label>
          <button
            className="bg-blue-500 text-white text-base font-medium py-3 rounded-md sm:py-2"
            type="submit"
          >
            Create
          </button>
        </form>
      </dialog>

      <button
        className="bg-blue-500 text-white w-12 h-12 p-2 text-2xl font-semibold rounded-[50%] fixed bottom-8 right-8  sm:bottom-16 sm:right-16"
        onClick={openDialog}
      >
        +
      </button>
    </>
  );
}
