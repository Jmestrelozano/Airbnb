"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import axios from "axios";

import { Modal } from "./Modal";
import { useStore } from "@/app/store/store";

import { Heading } from "../headers/Heading";
import { Button } from "../buttons/Button";
import { Input } from "../inputs/Input";
import { AxiosIsError } from "@/app/utils/axiosIsError";

import { Store } from "@/app/interfaces";

export const RegisterModal = () => {
  const { onCloseRegisterModal, onOpenLoginModal, isOpenRegisterModal } =
    useStore((store: Store) => store);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    axios
      .post("/api/auth/register", data)
      .then(() => {
        toast.success("Registered!");
        onCloseRegisterModal();
        onOpenLoginModal();
      })
      .catch((error) => {
        if (AxiosIsError(error)) {
          return toast.error(
            "Hubo un error en el servidor, Intenta nuevamente"
          );
        }

        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    onCloseRegisterModal();
    onOpenLoginModal();
  }, [onCloseRegisterModal, onOpenLoginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpenRegisterModal}
      title="Register"
      actionLabel="Continue"
      onClose={onCloseRegisterModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
