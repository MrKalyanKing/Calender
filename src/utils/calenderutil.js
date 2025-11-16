// src/utils/calenderutil.js
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";

export function buildCalendarMatrix(date) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });

  const matrix = [];
  let curr = start;

  while (curr <= end) {
    const row = [];
    for (let i = 0; i < 7; i++) {
      row.push(new Date(curr));
      curr = addDays(curr, 1);
    }
    matrix.push(row);
  }

  return matrix;
}
