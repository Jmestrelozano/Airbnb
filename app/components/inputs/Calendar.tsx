"use client";

import { DateRange } from "react-date-range";

import { InputCalendarProps } from "@/app/interfaces";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const InputCalendar: React.FC<InputCalendarProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};
