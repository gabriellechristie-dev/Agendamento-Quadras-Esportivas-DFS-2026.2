export function DaySelector({ days, selectedDay, onSelect }) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
      {days.map((day) => {
        const active = day.iso === selectedDay;
        return (
          <button
            key={day.iso}
            onClick={() => onSelect(day.iso)}
            className={`flex flex-col items-center gap-1 rounded-xl py-3 text-sm font-medium transition ${
              active
                ? "bg-brand-600 text-white shadow-card"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <span className="text-xs opacity-80">{day.weekday}</span>
            <span className="text-lg font-bold">{day.dayOfMonth}</span>
          </button>
        );
      })}
    </div>
  );
}

export function TimeSelector({ slots, selectedTime, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
      {slots.map(({ time, unavailable }) => {
        const active = time === selectedTime;
        return (
          <button
            key={time}
            disabled={unavailable}
            onClick={() => onSelect(time)}
            className={`rounded-xl py-3 text-sm font-medium transition ${
              unavailable
                ? "cursor-not-allowed bg-slate-50 text-slate-300 line-through"
                : active
                ? "bg-brand-600 text-white shadow-card"
                : "bg-white border border-slate-200 text-slate-700 hover:border-brand-400"
            }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
