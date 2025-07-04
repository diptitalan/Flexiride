import { Menu } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isBefore,
} from "date-fns";

const getCalendarDays = (month: Date) => {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const allDays = eachDayOfInterval({ start, end });
  const prefix = Array(start.getDay()).fill(null);
  return [...prefix, ...allDays];
};

const PeriodDropdown: React.FC<{
  onPeriodChange: (range: { start: Date | null; end: Date | null }) => void;
  label?: string;
   className?: string;
}> = ({ onPeriodChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [baseMonth, setBaseMonth] = useState(new Date());

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (day: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (isBefore(day, startDate)) {
      setEndDate(startDate);
      setStartDate(day);
    } else {
      setEndDate(day);
    }

    setTimeout(() => {
      onPeriodChange({
        start: !startDate || (startDate && endDate) ? day : startDate,
        end: !startDate || (startDate && endDate) ? null : day,
      });
    }, 0);
  };

  const renderCalendar = (month: Date) => {
    const days = getCalendarDays(month);
    return (
      <div className="w-60 p-2 backdrop-blur-sm rounded-md shadow-md">
        <div className="text-center font-semibold mb-2">
          {format(month, "MMMM yyyy")}
        </div>
        <div className="grid grid-cols-7 text-sm text-center font-medium mb-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={`${d}-${i}`}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-sm">
          {days.map((day, idx) => {
            if (!day) return <div key={idx} />;
            const isSelected =
              (startDate && isSameDay(day, startDate)) ||
              (endDate && isSameDay(day, endDate));
            const isInRange =
              startDate &&
              endDate &&
              isBefore(startDate, day) &&
              isBefore(day, endDate);
            return (
              <button
                key={day.toString()}
                onClick={() => handleSelect(day)}
                className={`rounded-full w-8 h-8 text-center ${
                  isSelected
                    ? "bg-black text-white"
                    : isInRange
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Menu as="div" className="relative ml-3" ref={dropdownRef}>
      <Menu.Button
        className="h-9 mt-1 min-w-[180px] w-full sm:w-[200px] px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-transparent hover:border-gray-400 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700 font-medium">
          {startDate && endDate
            ? `${format(startDate, "dd MMM")} - ${format(endDate, "dd MMM")}`
            : "Period"}
        </span>
        <svg
          className="w-4 h-4 text-gray-500 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Menu.Button>

      {isOpen && (
        <Menu.Items
          static
          className="absolute z-20 mt-2 bg-transparent rounded-lg p-2 flex flex-col"
        >
          <div className="flex justify-between items-center mb-4 px-2">
            <button onClick={() => setBaseMonth(subMonths(baseMonth, 1))}>
              ←
            </button>
            <button onClick={() => setBaseMonth(addMonths(baseMonth, 1))}>
              →
            </button>
          </div>
          <div className="flex space-x-4">
            {renderCalendar(baseMonth)}
            {renderCalendar(addMonths(baseMonth, 1))}
          </div>
        </Menu.Items>
      )}
    </Menu>
  );
};

export default PeriodDropdown;
