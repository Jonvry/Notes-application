export async function fetchNotes() {
  try {
    const response = await fetch("https://notes-six-navy.vercel.app/api/note", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong " };
  }
}

export async function fetchNoteById(id: string) {
  try {
    const response = await fetch(
      `https://notes-six-navy.vercel.app/api/note/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch note ${id}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong " };
  }
}
