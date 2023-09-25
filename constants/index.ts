import { IconType } from "react-icons";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiCactus,
  GiBarn,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";

export const SERVICE_FEE = 26;
export const DEFAULT_CURRENCY = "$";

export type Category = {
  id: string;
  label: string;
  icon: IconType;
  description: string;
};

export const categories = (t: any): Category[] => [
  {
    id: "beach",
    label: t("categories.beach.label"),
    icon: TbBeach,
    description: t("categories.beach.description"),
  },
  {
    id: "windmills",
    label: t("categories.windmills.label"),
    icon: GiWindmill,
    description: t("categories.windmills.description"),
  },
  {
    id: "modern",
    label: t("categories.modern.label"),
    icon: MdOutlineVilla,
    description: t("categories.modern.description"),
  },
  {
    id: "countryside",
    label: t("categories.countryside.label"),
    icon: TbMountain,
    description: t("categories.countryside.description"),
  },
  {
    id: "pools",
    label: t("categories.pools.label"),
    icon: TbPool,
    description: t("categories.pools.description"),
  },
  {
    id: "islands",
    label: t("categories.islands.label"),
    icon: GiIsland,
    description: t("categories.islands.description"),
  },
  {
    id: "lake",
    label: t("categories.lake.label"),
    icon: GiBoatFishing,
    description: t("categories.lake.description"),
  },
  {
    id: "skiing",
    label: t("categories.skiing.label"),
    icon: FaSkiing,
    description: t("categories.skiing.description"),
  },
  {
    id: "castles",
    label: t("categories.castles.label"),
    icon: GiCastle,
    description: t("categories.castles.description"),
  },
  {
    id: "caves",
    label: t("categories.caves.label"),
    icon: GiCaveEntrance,
    description: t("categories.caves.description"),
  },
  {
    id: "camping",
    label: t("categories.camping.label"),
    icon: GiForestCamp,
    description: t("categories.camping.description"),
  },
  {
    id: "arctic",
    label: t("categories.arctic.label"),
    icon: BsSnow,
    description: t("categories.arctic.description"),
  },
  {
    id: "desert",
    label: t("categories.desert.label"),
    icon: GiCactus,
    description: t("categories.desert.description"),
  },
  {
    id: "barns",
    label: t("categories.barns.label"),
    icon: GiBarn,
    description: t("categories.barns.description"),
  },
  {
    id: "lux",
    label: t("categories.lux.label"),
    icon: IoDiamond,
    description: t("categories.lux.description"),
  },
];
