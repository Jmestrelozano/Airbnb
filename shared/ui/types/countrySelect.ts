import { CountrySelectValue } from "@/shared/lib/types/global";

export interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
