import React from "react";

export default function EventBadge({ event }) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-md px-2 py-0.5 text-[11px] text-gray-700 truncate">
      <div className="font-medium truncate">{event.title}</div>
      {event.timeStart && (
        <div className="text-[10px] text-gray-500">{event.timeStart}</div>
      )}
    </div>
  );
}
