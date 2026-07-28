"use client";

import { ContainerCategoryBox } from "@/features/navigation/components/ContainerCategoryBox";
import { useContainerCategoryBox } from "@/features/navigation/hooks/useContainerCategoryBox";
import { CategoryBoxProps } from "@/features/navigation/types/containerCategoryBox.interface";

export const ContainerCategoryBoxView: React.FC<CategoryBoxProps> = (props) => {
  const { onClick } = useContainerCategoryBox(props.label);

  return <ContainerCategoryBox {...props} onClick={onClick} />;
};
