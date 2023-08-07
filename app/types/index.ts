import { Listing, User } from "@prisma/client";

export type ImageData = {
  asset_id: string;
  url: string;
  width: number;
  height: number;
};

export type LocationData = {
  address: string;
  shortAddress: string;
  geometry: google.maps.LatLngLiteral;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing, "createdAt" | "images" | "location"> & {
  createdAt: string;
  location: LocationData;
  images: ImageData[];
};
