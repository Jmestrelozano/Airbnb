import { CountrySelectValue } from "@/shared/lib/types/global";

export interface CountrySelectProps {
  value?: CountrySelectValue | null;
  onChange: (value: CountrySelectValue) => void;
}
