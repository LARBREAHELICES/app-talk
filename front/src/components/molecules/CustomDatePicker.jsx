import { useState, useEffect } from "react";

function CustomDatePicker({ value, onChange, label = "Date" }) {
  const today = new Date();
  const [showCalendar, setShowCalendar] = useState(false);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : today);
  const [hour, setHour] = useState(String(today.getHours()).padStart(2, "0"));
  const [minute, setMinute] = useState(String(today.getMinutes()).padStart(2, "0"));

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay() || 7;

  useEffect(() => {
    if (!value) {
      const initDate = new Date();
      onChange(initDate.toISOString());
    }
  }, []);

  const handleDateClick = (day) => {
    const newDate = new Date(year, month, day, parseInt(hour), parseInt(minute));
    setSelectedDate(newDate);
    setShowCalendar(false);
    onChange(newDate.toISOString());
  };

  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const blanks = Array(firstDay - 1).fill(null);
    const days = [...blanks, ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    return (
      <div className="absolute mt-2 z-20 bg-white border rounded-xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <button onClick={prevMonth} className="text-gray-600">←</button>
          <span className="font-semibold">{months[month]} {year}</span>
          <button onClick={nextMonth} className="text-gray-600">→</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => (
            <div key={i} className="h-10 flex justify-center items-center">
              {day ? (
                <button
                  onClick={() => handleDateClick(day)}
                  className={`w-9 h-9 rounded-full text-sm
                    ${
                      selectedDate &&
                      selectedDate.getDate() === day &&
                      selectedDate.getMonth() === month &&
                      selectedDate.getFullYear() === year
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-100"
                    }`}
                >
                  {day}
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="p-2 border rounded-lg"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={String(i).padStart(2, "0")}>
                {String(i).padStart(2, "0")} h
              </option>
            ))}
          </select>
          <select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="p-2 border rounded-lg"
          >
            {["00", "15", "30", "45"].map((m) => (
              <option key={m} value={m}>
                {m} min
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        readOnly
        value={selectedDate ? selectedDate.toLocaleString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }) : ""}
        onClick={toggleCalendar}
        placeholder="Sélectionner une date"
        className="w-full p-3 rounded-xl border border-gray-300 bg-white cursor-pointer"
      />
      {showCalendar && renderCalendar()}
    </div>
  );
}

export default CustomDatePicker;
