import { Zap, CalendarCheck2, ListChecks, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: Zap,
    title: "Reserva em 3 cliques",
    description: "Escolha data, horário e confirme. Sem ligações, sem grupos de WhatsApp.",
  },
  {
    icon: CalendarCheck2,
    title: "Disponibilidade real",
    description: "Calendário atualizado com horários bloqueados e livres de cada quadra.",
  },
  {
    icon: ListChecks,
    title: "Preço transparente",
    description: "Valor por hora sempre visível antes de confirmar a reserva.",
  },
  {
    icon: ShieldCheck,
    title: "Cancelamento flexível",
    description: "Cancele pelo painel dentro do prazo da quadra, sem burocracia.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-slate-100/70 py-16 sm:py-20">
      <div className="container-app">
        <h2 className="font-display text-3xl font-bold">Por que reservar no ArenaPlay</h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-white">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
