import { differenceInDays } from "date-fns";
import { Range } from "react-date-range";

export function getTotalPrice(price: number, dateRange: Range) {
  if (dateRange.startDate && dateRange.endDate) {
    const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

    if (dayCount && price) {
      return dayCount * price;
    }
  }

  return price;
}
