import axios from "axios";

export const AxiosIsError = (error: any): boolean => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status !== 200) return true;
  }

  return false;
};
