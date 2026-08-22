export default function Badge({ children, tone = "success" }) {
  const tones = {
    success: "bg-emerald-500 text-white",
    neutral: "bg-slate-100 text-slate-700",
    brand: "bg-brand-50 text-brand-700",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
