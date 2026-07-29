import { IconType } from "react-icons";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineApartment, MdOutlineBeachAccess } from "react-icons/md";
import { TbMountain, TbBuildingSkyscraper } from "react-icons/tb";
import { GiPalmTree } from "react-icons/gi";

export type SuggestedDestination = {
  id: string;
  label: string;
  subtitle: string;
  locationValue?: string;
  icon: IconType;
  iconBg: string;
  iconColor: string;
};

export const suggestedDestinations: SuggestedDestination[] = [
  {
    id: "near",
    label: "Cerca",
    subtitle: "Descubre qué hay a tu alrededor",
    icon: HiOutlineLocationMarker,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "barranquilla",
    label: "Barranquilla, Atlántico",
    subtitle: "Ideal para escapadas de fin de semana",
    locationValue: "CO",
    icon: MdOutlineApartment,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    id: "bogota",
    label: "Bogotá, Bogotá",
    subtitle: "Porque tus anfitriones favoritos están aquí",
    locationValue: "CO",
    icon: TbBuildingSkyscraper,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    id: "medellin",
    label: "Medellín, Antioquia",
    subtitle: "Un destino favorito entre los viajeros",
    locationValue: "CO",
    icon: TbMountain,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: "cartagena",
    label: "Cartagena, Bolívar",
    subtitle: "Ideal para visitas a lugares emblemáticos",
    locationValue: "CO",
    icon: MdOutlineBeachAccess,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: "santa-marta",
    label: "Santa Marta, Magdalena",
    subtitle: "Ideal para vacaciones en la playa",
    locationValue: "CO",
    icon: GiPalmTree,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
];
