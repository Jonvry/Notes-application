export default function NotFound() {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <div className="grid gap-3">
        <h2 className="text-xl font-semibold text-red-700">404 Not Found</h2>
        <p>Could not find the requested Note.</p>
      </div>
    </div>
  );
}
