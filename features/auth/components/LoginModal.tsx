"use client";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import { Heading } from "@/shared/ui/Heading";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";
import { LoginModalProps } from "@/features/auth/types/loginModal.interface";

export const LoginModal: React.FC<LoginModalProps> = ({
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
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
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
          First time using Airbnb?
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
