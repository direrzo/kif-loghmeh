export default function Button({
  children,
  variant = "primary",
  className = "",
  ...p
}) {
  const v = {
    primary: "bg-brand-600 hover:bg-brand-700 text-white",
    secondary:
      "bg-white border border-slate-200 hover:border-brand-500 text-slate-700",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  }[variant];
  return (
    <button
      className={`rounded-xl px-4 py-2.5 font-semibold transition disabled:opacity-50 ${v} ${className}`}
      {...p}
    >
      {children}
    </button>
  );
}
