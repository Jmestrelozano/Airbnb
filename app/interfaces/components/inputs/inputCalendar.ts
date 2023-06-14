import { Range, RangeKeyDict } from "react-date-range";

export interface InputCalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}
