import { User } from "next-auth";

export interface UserProps {
  currentUser?: User | null;
}
