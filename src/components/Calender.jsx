import React, { useEffect, useMemo, useState } from "react";
import {
  format,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import EventBadge from "./Event";
import EventTop from "./EventTop";
import { buildCalendarMatrix } from "../utils/calenderutil";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const today = new Date();

  useEffect(() => {
    fetch("/event.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch events.json");
        return r.json();
      })
      .then((data) => {
        console.log("[Calendar] raw events:", data);

        const normalized = data.map((e) => {
          let normalizedIso = e.date;
          try {
            normalizedIso = format(parseISO(e.date), "yyyy-MM-dd");
          } catch (err) {
            console.warn("Calendar parseiso failed for", e.date, err);
          }
          return { ...e, _iso: normalizedIso };
        });

        const map = normalized.reduce((acc, ev) => {
          acc[ev._iso] = acc[ev._iso] || [];
          acc[ev._iso].push(ev);
          return acc;
        }, {});
        console.log("[Calendar] iso -> events map:", map);

        setEvents(normalized);

        const monthPrefix = format(currentMonth, "yyyy-MM");
        const firstInMonth = normalized.find((ev) => ev._iso.startsWith(monthPrefix));
        setSelectedEvent(firstInMonth ?? normalized[0] ?? null);

        if (!normalized.length) {
          console.warn("[Calendar] no events loaded");
        }
      })
      .catch((err) => {
        console.error("[Calendar] error fetching events:", err);
      });
  }, [currentMonth]);

  const matrix = useMemo(() => buildCalendarMatrix(currentMonth), [currentMonth]);

  useEffect(() => {
    if (!matrix || !matrix.length) return;
    const first = matrix[0][0];
    const last = matrix[matrix.length - 1][6];
    console.log(
      `[Calendar] matrix range: ${format(first, "yyyy-MM-dd")} -> ${format(last, "yyyy-MM-dd")}`
    );
  }, [matrix]);

  const nextMonth = () => setCurrentMonth((m) => addMonths(m, 1));
  const prevMonth = () => setCurrentMonth((m) => subMonths(m, 1));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <EventTop event={selectedEvent} />

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-400 text-sm">Full Event Schedule</div>
            <h2 className="font-semibold text-lg">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevMonth}
              className="px-3 py-2 rounded-md bg-white border text-gray-600"
            >
              ◀
            </button>

            <button
              onClick={nextMonth}
              className="px-3 py-2 rounded-md bg-white border text-gray-600"
            >
              ▶
            </button>

            <button className="flex items-center gap-2 border px-4 py-2 rounded-md bg-white text-gray-600">
              📍 34 West 15th Street, NY
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 text-xs text-gray-400 px-2 mb-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="text-center py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border border-gray-200 rounded-lg overflow-hidden">
        {matrix.flat().map((day) => {
          const iso = format(day, "yyyy-MM-dd");
          const dayEvents = events.filter((ev) => ev._iso === iso);

          const isToday = isSameDay(day, today);
          const inMonth = isSameMonth(day, currentMonth);

          return (
            <div
              key={iso}
              onClick={() => {
                console.log("[Calendar] clicked day:", iso, "events:", dayEvents);
                setSelectedEvent(dayEvents[0] || null);
              }}
              className={`
                relative h-[82px] p-2 border border-gray-200 cursor-pointer
                hover:bg-gray-50 transition
                ${inMonth ? "bg-white" : "bg-gray-50 text-gray-300"}
                ${isToday ? "border-purple-500" : ""}
              `}
            >
              
              <div
                className={`text-sm font-medium ${
                  inMonth ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {format(day, "d")}
              </div>

             
              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 2).map((ev) => (
                  <EventBadge key={ev.id} event={ev} />
                ))}
              </div>

              
              {dayEvents.length > 0 && (
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <div className="text-[11px] text-gray-600">{dayEvents.length}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
