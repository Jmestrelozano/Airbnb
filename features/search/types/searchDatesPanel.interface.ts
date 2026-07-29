import { Range } from "react-date-range";

export type SearchDatesMode = "dates" | "flexible";

export interface SearchDatesFlexOption {
  label: string;
  value: number;
}

export interface SearchDatesPanelInput {
  dateRange: Range;
  onChange: (value: Range) => void;
}

export interface SearchDatesPanelProps extends SearchDatesPanelInput {
  mode: SearchDatesMode;
  setMode: (mode: SearchDatesMode) => void;
  flexDays: number | null;
  setFlexDays: (value: number) => void;
  months: number;
  flexOptions: SearchDatesFlexOption[];
  clearFlexFilter: (
    event: React.MouseEvent | React.KeyboardEvent,
    value: number
  ) => void;
}
