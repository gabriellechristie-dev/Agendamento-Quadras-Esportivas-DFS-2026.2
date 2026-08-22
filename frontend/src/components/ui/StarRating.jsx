import { Star } from "lucide-react";

export default function StarRating({ rating, reviewCount, size = 16 }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-700">
      <Star size={size} className="fill-amber-400 text-amber-400" />
      {rating}
      {reviewCount ? <span className="text-slate-400 font-normal">({reviewCount})</span> : null}
    </span>
  );
}
