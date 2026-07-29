import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

export const categories = [
  {
    label: "Beach",
    displayLabel: "Playa",
    icon: TbBeach,
    description: "Esta propiedad está cerca de la playa",
  },
  {
    label: "Windmills",
    displayLabel: "Molinos",
    icon: GiWindmill,
    description: "Esta propiedad tiene molinos",
  },
  {
    label: "Modern",
    displayLabel: "Modernas",
    icon: MdOutlineVilla,
    description: "Esta propiedad es moderna",
  },
  {
    label: "Countryside",
    displayLabel: "Campo",
    icon: TbMountain,
    description: "Esta propiedad está en el campo",
  },
  {
    label: "Pools",
    displayLabel: "Piscinas",
    icon: TbPool,
    description: "Esta propiedad tiene una piscina hermosa",
  },
  {
    label: "Islands",
    displayLabel: "Islas",
    icon: GiIsland,
    description: "Esta propiedad está en una isla",
  },
  {
    label: "Lake",
    displayLabel: "Lagos",
    icon: GiBoatFishing,
    description: "Esta propiedad está cerca de un lago",
  },
  {
    label: "Skiing",
    displayLabel: "Ski",
    icon: FaSkiing,
    description: "Esta propiedad tiene actividades de ski",
  },
  {
    label: "Castles",
    displayLabel: "Castillos",
    icon: GiCastle,
    description: "Esta propiedad es un castillo antiguo",
  },
  {
    label: "Caves",
    displayLabel: "Cuevas",
    icon: GiCaveEntrance,
    description: "Esta propiedad está en una cueva",
  },
  {
    label: "Camping",
    displayLabel: "Camping",
    icon: GiForestCamp,
    description: "Esta propiedad ofrece camping",
  },
  {
    label: "Arctic",
    displayLabel: "Ártico",
    icon: BsSnow,
    description: "Esta propiedad está en el ártico",
  },
  {
    label: "Desert",
    displayLabel: "Desierto",
    icon: GiCactus,
    description: "Esta propiedad está en el desierto",
  },
  {
    label: "Barns",
    displayLabel: "Graneros",
    icon: GiBarn,
    description: "Esta propiedad es un granero",
  },
  {
    label: "Lux",
    displayLabel: "Lujo",
    icon: IoDiamond,
    description: "Esta propiedad es de lujo",
  },
];

export const getCategoryDisplayLabel = (label: string) =>
  categories.find((c) => c.label === label)?.displayLabel ?? label;
