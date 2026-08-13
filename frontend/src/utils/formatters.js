export function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const WEEKDAYS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const WEEKDAYS_SHORT = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function getUpcomingDays(count = 7) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      iso: date.toISOString().split("T")[0],
      weekday: WEEKDAYS_SHORT[date.getDay()],
      dayOfMonth: date.getDate(),
      date,
    });
  }
  return days;
}

export function formatLongDate(dateISO) {
  const date = new Date(`${dateISO}T00:00:00`);
  const weekday = WEEKDAYS[date.getDay()];
  const day = date.getDate();
  const month = date.toLocaleDateString("pt-BR", { month: "long" });
  return `${weekday}, ${day} de ${month}`;
}
