"use client";

import { useRouter } from "next/navigation";

import { Heading } from "@/shared/ui/Heading";
import { Button } from "@/shared/ui/Button";
import { EmptyStateProps } from "@/shared/ui/types/emptyState";

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No hay coincidencias exactas",
  subtitle = "Prueba a cambiar o quitar algunos de tus filtros.",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Quitar todos los filtros"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};
