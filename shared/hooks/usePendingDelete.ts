"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { useAsyncAction } from "@/shared/hooks/useAsyncAction";

type UsePendingDeleteParams = {
  deleteFn: (id: string) => Promise<unknown>;
  successMessage: string;
  errorMessage?: string;
};

export const usePendingDelete = ({
  deleteFn,
  successMessage,
  errorMessage = "Something went wrong.",
}: UsePendingDeleteParams) => {
  const router = useRouter();
  const { pendingKey: deletingId, run } = useAsyncAction();

  const onDelete = useCallback(
    (id: string) => {
      void run(() => deleteFn(id), {
        successMessage,
        pendingKey: id,
        errorMessage: (error: unknown) => {
          const axiosError = error as {
            response?: { data?: { error?: string } };
          };

          return axiosError?.response?.data?.error || errorMessage;
        },
        onSuccess: () => {
          router.refresh();
        },
      });
    },
    [deleteFn, successMessage, errorMessage, router, run]
  );

  return { deletingId, onDelete };
};
