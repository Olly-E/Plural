import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";

// --- CONSTANTS ---
const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

// --- CALENDAR PICKER COMPONENT (Isolated) ---

interface CalendarPickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
  time: string;
  onTimeChange: (time: string) => void;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  date,
  onDateChange,
  time,
  onTimeChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const goToPrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const renderDays = () => {
    const days = [];
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    daysOfWeek.forEach((day, index) => {
      days.push(
        <div
          key={`header-${index}`}
          className="text-center font-semibold text-gray-900 text-sm p-2"
        >
          {day}
        </div>
      );
    });

    const daysInPrevMonth = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <div
          key={`prev-${i}`}
          className="text-center text-sm text-gray-400 p-2"
        >
          {day}
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      currentDate.setHours(0, 0, 0, 0);

      const isSelected = date.toDateString() === currentDate.toDateString();

      const isToday = today.toDateString() === currentDate.toDateString();

      const isPastDate = currentDate < today && !isToday;

      const handleDayClick = () => {
        if (!isPastDate) {
          onDateChange(currentDate);
        }
      };

      days.push(
        <div
          key={`day-${day}`}
          onClick={handleDayClick}
          className={clsx(
            "text-center text-sm p-2 transition-colors duration-150 rounded-full relative",
            {
              "bg-[#7A90C2] text-white font-bold cursor-pointer": isSelected,
              "text-white cursor-not-allowed": isPastDate && !isSelected,

              "text-white hover:text-black hover:bg-gray-100 cursor-pointer":
                !isSelected && !isPastDate,

              "border border-blue-600": isToday && !isSelected && !isPastDate,
            }
          )}
        >
          {day}
        </div>
      );
    }

    const totalDaysRendered = days.length - 7;
    const remainingCells = 42 - totalDaysRendered;

    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="text-center text-sm text-white/60 p-2"
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className=" rounded-lg p-4 max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-4 border-b pb-4 border-gray-1">
        <div className="text-white/80 font-semibold text-sm">
          Appointment Time
        </div>
        <div className="relative">
          <select
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pr-8 focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-pointer"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <button
          onClick={goToPrevMonth}
          type="button"
          className="size-8 centered min-w-8 rounded hover:bg-gray-100 text-gray-700"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-white font-semibold">{monthName}</span>
        <button
          type="button"
          onClick={goToNextMonth}
          className="size-8 centered min-w-8 rounded hover:bg-gray-100 text-gray-700"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mt-4">{renderDays()}</div>
    </div>
  );
};
