const icons = [
  "🥪",
  "🥙",
  "🍛",
  "🍲",
  "🍝",
  "🍚",
  "🥘",
  "🍔",
  "🍕",
  "🥗",
  "🧃",
  "💧",
  "🍱",
  "🍎",
  "🥛",
  "🍪",
];

export default function FoodImagePicker({
  value,
  onChange,
  emoji,
  onEmojiChange,
  onSelectIcon,
}) {
  const upload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };
  const selectIcon = (icon) => {
    if (onSelectIcon) onSelectIcon(icon);
    else {
      onEmojiChange(icon);
      onChange("");
    }
  };
  return (
    <div className="space-y-4 md:col-span-2">
      <div>
        <span className="block text-sm font-semibold text-slate-700">
          تصویر یا آیکون غذا
        </span>
        <p className="mt-1 text-xs text-slate-500">
          یک تصویر آپلود کنید یا یک آیکون آماده انتخاب کنید.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-amber-50 text-4xl">
          {value ? (
            <img
              src={value}
              alt="پیش‌نمایش غذا"
              className="h-full w-full object-cover"
            />
          ) : (
            emoji
          )}
        </div>
        <label className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-brand-500">
          آپلود تصویر
          <input
            type="file"
            accept="image/*"
            onChange={upload}
            className="hidden"
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600"
          >
            حذف تصویر
          </button>
        )}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <p className="mb-3 text-sm font-semibold text-slate-700">
          انتخاب آیکون
        </p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
          {icons.map((icon) => (
            <button
              type="button"
              key={icon}
              aria-label={`انتخاب آیکون ${icon}`}
              onClick={() => selectIcon(icon)}
              className={`grid aspect-square place-items-center rounded-xl border bg-white text-2xl transition hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-50 ${!value && emoji === icon ? "border-brand-600 bg-brand-100 ring-2 ring-brand-200" : "border-slate-200"}`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500">
        انتخاب آیکون، تصویر آپلودشده را پاک می‌کند تا آیکون در کل سایت نمایش
        داده شود.
      </p>
    </div>
  );
}
