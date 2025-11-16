import React from "react";

export default function EventTop({ event }) {
  if (!event) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <div className="text-green-600 font-medium text-sm mb-1">Weekly</div>

      <h2 className="text-2xl font-semibold">{event.title}</h2>

      <div className="flex items-center gap-10 mt-4 text-gray-500 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <span>👥</span>
            Members – {event.members} out of {event.capacity}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span>⏰</span>
            Time – {event.timeStart} – {event.timeEnd}
          </div>
        </div>

        <div>
          <div className="font-medium mb-1">Event Days</div>
          <div className="flex gap-2">
            {event.days.map((day) => (
              <div
                key={day}
                className="px-3 py-0.5 rounded-md bg-gray-100 text-gray-600 text-sm"
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        <button className="ml-auto px-4 py-2 rounded-md border bg-white text-sm">
          ✏️ Edit Master Event
        </button>
      </div>
    </div>
  );
}
