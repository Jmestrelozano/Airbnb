import { SearchDatesFlexOption } from "@/features/search/types/searchDatesPanel.interface";

export const searchDatesFlexOptions: SearchDatesFlexOption[] = [
  { label: "Fechas exactas", value: 0 },
  { label: "± 1 día", value: 1 },
  { label: "± 2 días", value: 2 },
  { label: "± 3 días", value: 3 },
  { label: "± 7 días", value: 7 },
  { label: "± 14 días", value: 14 },
];
