import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface RegisterModalProps {
  isOpen: boolean;
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onClose: () => void;
  onSubmit: () => void;
  onToggle: () => void;
  onGoogle: () => void;
  onGithub: () => void;
}
