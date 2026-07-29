"use client";

import { DateRange } from "react-date-range";

import { InputCalendarProps } from "@/shared/ui/types/inputCalendar";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const InputCalendar: React.FC<InputCalendarProps> = ({
  value,
  onChange,
  disabledDates,
  months = 1,
  direction = "vertical",
  locale,
  rangeColors = ["#222222"],
}) => {
  return (
    <DateRange
      rangeColors={rangeColors}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction={direction}
      months={months}
      showDateDisplay={false}
      showMonthAndYearPickers={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      locale={locale}
      monthDisplayFormat="MMMM yyyy"
    />
  );
};
