import { Range } from "react-date-range";
import { CountrySelectValue } from "@/shared/lib/types/global";
import { SEARCH_STEPS } from "@/features/search/types/searchSteps.type";

export interface SearchModalProps {
  isOpen: boolean;
  step: SEARCH_STEPS;
  location?: CountrySelectValue;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  dateRange: Range;
  actionLabel: string;
  secondaryActionLabel?: string;
  setLocation: (value: CountrySelectValue) => void;
  setGuestCount: (value: number) => void;
  setRoomCount: (value: number) => void;
  setBathroomCount: (value: number) => void;
  setDateRange: (value: Range) => void;
  onBack: () => void;
  onSubmit: () => void;
  onClose: () => void;
}
