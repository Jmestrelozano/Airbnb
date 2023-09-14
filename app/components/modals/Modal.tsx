"use client";

import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { ModalProps } from "@/app/interfaces";
import { Button } from "../buttons/Button";

export const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  disabled,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState<boolean>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = () => {
    if (disabled) return;

    onSubmit();
  };

  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  };

  return (
    <>
      {!isOpen ? null : (
        <>
          <div
            className="flex justify-center items-center  overflow-y-auto overflow-x-hidden fixed inset-0 z-50 outline-none 
          focus:outline-none bg-neutral-800/70"
          >
            <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
              <div
                className={`translate duration-300 h-full ${
                  showModal ? "translate-y-0" : "translate-y-full"
                }
                ${showModal ? "opacity-100" : "opacity-0"}`}
              >
                <div
                  className="translate h-full md:h-auto border rounded-lg shadow-lg relative flex flex-col w-full bg-white
                outline-none focus:outline-none"
                >
                  <div className="flex items-center p-6 rounded-t justify-center relative border-b">
                    <button
                      onClick={handleClose}
                      className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                    >
                      <IoMdClose size={18} />
                    </button>
                    <div className="text-lg font-semibold">{title}</div>
                  </div>
                  <div className="relative p-6 flex-auto">{body}</div>
                  <div className="flex flex-col gap-2 p-6">
                    <div className="flex flex-row items-center gap-4 w-full">
                      {secondaryAction && secondaryActionLabel && (
                        <Button
                          outline
                          disabled={disabled}
                          onClick={handleSecondaryAction}
                          label={secondaryActionLabel}
                        />
                      )}
                      <Button
                        disabled={disabled}
                        onClick={handleSubmit}
                        label={actionLabel}
                      />
                    </div>
                    {footer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
