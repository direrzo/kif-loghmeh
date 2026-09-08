export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      className={`fixed bottom-5 left-5 z-50 rounded-xl px-5 py-3 text-white shadow-xl ${toast.type === "error" ? "bg-red-500" : "bg-brand-600"}`}
    >
      {toast.message}
    </div>
  );
}
