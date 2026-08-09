import { Star } from "lucide-react";
import { testimonials } from "../../data/testimonials.js";

export default function Testimonials() {
  return (
    <section className="container-app py-16 sm:py-20">
      <h2 className="font-display text-3xl font-bold">Quem já jogou com a gente</h2>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="card p-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                />
              ))}
            </div>
            <p className="mt-4 text-slate-600">“{testimonial.comment}”</p>
            <p className="mt-4 font-semibold">
              {testimonial.name} <span className="font-normal text-slate-400">{testimonial.sport}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
