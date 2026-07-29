import { Locale } from "date-fns";
import { Range, RangeKeyDict } from "react-date-range";

export interface InputCalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
  months?: number;
  direction?: "vertical" | "horizontal";
  locale?: Locale;
  rangeColors?: string[];
}
