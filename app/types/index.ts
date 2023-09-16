import { Listing, Prisma, Reservation, User } from "@prisma/client";

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

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
};

export type SafeReservationWithListing = SafeReservation & {
  listing: SafeListing;
};

export function transformLocation(location: Prisma.JsonValue): LocationData {
  if (typeof location !== "object" || location === null) {
    throw new Error("Invalid location data");
  }

  const { address, shortAddress, geometry } = location as any;

  if (
    typeof address !== "string" ||
    typeof shortAddress !== "string" ||
    typeof geometry !== "object"
  ) {
    throw new Error("Invalid location data");
  }

  return {
    address,
    shortAddress,
    geometry: {
      lat: geometry.lat,
      lng: geometry.lng,
    },
  };
}

export function transformImages(images: Prisma.JsonValue): ImageData[] {
  if (!Array.isArray(images)) {
    throw new Error("Invalid images data");
  }

  let transformedImages: ImageData[] = [];
  for (let image of images) {
    const { asset_id, url, width, height } = image as any;

    if (
      typeof asset_id !== "string" ||
      typeof url !== "string" ||
      typeof width !== "number" ||
      typeof height !== "number"
    ) {
      throw new Error("Invalid image data");
    }

    transformedImages.push({
      asset_id,
      url,
      width,
      height,
    });
  }

  return transformedImages;
}
