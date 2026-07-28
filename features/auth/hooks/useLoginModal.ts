"use client";

import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useStore } from "@/shared/lib/store";
import { Store } from "@/shared/lib/types/store";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { useAuthApi } from "@/features/auth/hooks/useAuthApi";

export const useLoginModal = () => {
  const router = useRouter();
  const { isOpenLoginModal, onOpenRegisterModal, onCloseLoginModal } = useStore(
    (store: Store) => store
  );
  const { loginWithCredentials, loginWithGoogle, loginWithGithub } =
    useAuthApi();
  const { isLoading, run } = useAsyncAction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    void run(
      async () => {
        const callback = await loginWithCredentials(data);

        if (callback?.error) {
          throw new Error(callback.error);
        }

        if (!callback?.ok) {
          throw new Error("Something went wrong.");
        }

        return callback;
      },
      {
        successMessage: "Logged in",
        errorMessage: (error) =>
          error instanceof Error ? error.message : "Something went wrong.",
        onSuccess: () => {
          router.refresh();
          onCloseLoginModal();
        },
      }
    );
  };

  const onToggle = useCallback(() => {
    onCloseLoginModal();
    onOpenRegisterModal();
  }, [onCloseLoginModal, onOpenRegisterModal]);

  return {
    isOpen: isOpenLoginModal,
    isLoading,
    register,
    errors,
    onClose: onCloseLoginModal,
    onSubmit: handleSubmit(onSubmit),
    onToggle,
    onGoogle: loginWithGoogle,
    onGithub: loginWithGithub,
  };
};
