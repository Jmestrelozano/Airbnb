"use client";

import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useStore } from "@/shared/lib/store";
import { AxiosIsError } from "@/shared/lib/axiosIsError";
import { Store } from "@/shared/lib/types/store";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { useAuthApi } from "@/features/auth/hooks/useAuthApi";

export const useRegisterModal = () => {
  const { onCloseRegisterModal, onOpenLoginModal, isOpenRegisterModal } =
    useStore((store: Store) => store);
  const { register: registerUser, loginWithGoogle, loginWithGithub } =
    useAuthApi();
  const { isLoading, run } = useAsyncAction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    void run(() => registerUser(data), {
      successMessage: "Registered!",
      errorMessage: (error) => {
        if (AxiosIsError(error)) {
          return "Hubo un error en el servidor, Intenta nuevamente";
        }

        return String(error);
      },
      onSuccess: () => {
        onCloseRegisterModal();
        onOpenLoginModal();
      },
    });
  };

  const onToggle = useCallback(() => {
    onCloseRegisterModal();
    onOpenLoginModal();
  }, [onCloseRegisterModal, onOpenLoginModal]);

  return {
    isOpen: isOpenRegisterModal,
    isLoading,
    register,
    errors,
    onClose: onCloseRegisterModal,
    onSubmit: handleSubmit(onSubmit),
    onToggle,
    onGoogle: loginWithGoogle,
    onGithub: loginWithGithub,
  };
};
