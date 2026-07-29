import { MdOutlineHome } from "react-icons/md";
import { TbBalloon } from "react-icons/tb";
import { LuBell } from "react-icons/lu";

import { SearchMobileTab } from "@/features/search/types/searchMobileSheet.interface";

export const searchMobileTabs: SearchMobileTab[] = [
  { id: "stays", label: "Alojamientos", Icon: MdOutlineHome },
  { id: "experiences", label: "Experiencias", Icon: TbBalloon },
  { id: "services", label: "Servicios", Icon: LuBell },
];
