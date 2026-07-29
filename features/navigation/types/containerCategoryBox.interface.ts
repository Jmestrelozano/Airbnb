import { IconType } from "react-icons";

export interface CategoryBoxProps {
  icon: IconType;
  label: string;
  displayLabel?: string;
  selected?: boolean;
}

export interface ContainerCategoryBoxProps extends CategoryBoxProps {
  onClick: () => void;
}
