"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { Modal } from "@/shared/ui/Modal";
import { Heading } from "@/shared/ui/Heading";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { RegisterModalProps } from "@/features/auth/types/registerModal.interface";

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  isLoading,
  register,
  errors,
  onClose,
  onSubmit,
  onToggle,
  onGoogle,
  onGithub,
}) => {
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
        onClick={onGoogle}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={onGithub}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
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
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
