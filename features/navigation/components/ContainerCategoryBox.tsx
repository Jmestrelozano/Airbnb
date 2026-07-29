"use client";

import { ContainerCategoryBoxProps } from "@/features/navigation/types/containerCategoryBox.interface";

export const ContainerCategoryBox: React.FC<ContainerCategoryBoxProps> = ({
  icon: Icon,
  label,
  displayLabel,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-1.5
        px-3
        py-2
        min-w-[56px]
        border-b-2
        hover:text-neutral-800
        hover:border-b-neutral-300
        transition
        cursor-pointer
        whitespace-nowrap
        ${selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"}
      `}
    >
      <Icon size={24} />
      <div className="font-medium text-[12px] leading-tight">
        {displayLabel ?? label}
      </div>
    </div>
  );
};
