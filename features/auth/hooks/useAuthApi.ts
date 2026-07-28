"use client";

import { useCallback } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FieldValues } from "react-hook-form";

export const useAuthApi = () => {
  const register = useCallback((data: FieldValues) => {
    return axios.post("/api/auth/register", data);
  }, []);

  const loginWithCredentials = useCallback((data: FieldValues) => {
    return signIn("credentials", {
      ...data,
      redirect: false,
    });
  }, []);

  const loginWithGoogle = useCallback(() => {
    return signIn("google");
  }, []);

  const loginWithGithub = useCallback(() => {
    return signIn("github");
  }, []);

  return {
    register,
    loginWithCredentials,
    loginWithGoogle,
    loginWithGithub,
  };
};
