"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/note/${id}`, {
        method: "Delete",
      });

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <button
      className="text-red-600 border border-gray-300 px-3 py-1 rounded text-sm"
      aria-label="button"
      type="button"
      onClick={() => handleDelete(id)}
    >
      <Image
        src="/delete-icon.svg"
        className="w-auto h-auto"
        alt="delete_icon"
        width={16}
        height={16}
      />
    </button>
  );
}
