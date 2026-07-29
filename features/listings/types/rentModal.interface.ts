import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { CountrySelectValue } from "@/shared/lib/types/global";
import { RENT_STEPS } from "@/features/listings/types/rentSteps.type";

export interface RentModalProps {
  isOpen: boolean;
  isLoading: boolean;
  step: RENT_STEPS;
  location: CountrySelectValue | null;
  category: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  actionLabel: string;
  secondaryActionLabel?: string;
  setCustomValue: (id: string, value: unknown) => void;
  onBack: () => void;
  onClose: () => void;
  onSubmit: () => void;
}
