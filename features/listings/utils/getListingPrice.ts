import { SafeListing, SafeReservation } from "@/shared/lib/types/global";

export function getListingPrice(
  listingPrice: SafeListing["price"],
  reservation?: SafeReservation
) {
  if (reservation) {
    return reservation.totalPrice;
  }

  return listingPrice;
}
