// CalendarioHome.tsx
import React, { useState } from "react";

interface CalendarioHomeProps {
  currentMonth: number;
  currentYear: number;
  todayDay: number;
  todayMonth: number;
  todayYear: number;
}

const CalendarioHome: React.FC<CalendarioHomeProps> = ({
  currentMonth,
  currentYear,
  todayDay,
  todayMonth,
  todayYear,
}) => {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const calendarDays = Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1);

  const prevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="card p-6 bg-white rounded-lg">
      <div className="flex items-center justify-between text-black">
        <button onClick={prevMonth}>◂</button>
        <h3 className="font-semibold text-lg">
          {new Date(year, month - 1).toLocaleString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button onClick={nextMonth}>▸</button>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-7 gap-1 text-xs text-black">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
            <div key={d} className="text-center font-medium">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-3 text-sm text-black">
          {calendarDays.map((day) => (
            <div
              key={day}
              className={`calendar-day text-center text-sm cursor-pointer rounded-md ${
                day === todayDay && month === todayMonth && year === todayYear
                  ? "bg-blue-200 font-bold"
                  : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarioHome;
