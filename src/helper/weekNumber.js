import { getISOWeek } from "date-fns";

export const getWeekNumber = () => {
  const weekNumber = getISOWeek(new Date());
  return weekNumber;
};
