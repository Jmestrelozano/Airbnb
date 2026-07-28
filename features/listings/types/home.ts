import { IListingsParams } from "@/shared/lib/types/global";

export interface HomeProps {
  searchParams: Promise<IListingsParams>;
}
