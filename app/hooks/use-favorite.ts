import { MouseEvent, useCallback, useMemo } from "react";
import { SafeUser } from "../types";
import useAuthModal from "./use-auth-modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const authModal = useAuthModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return authModal.onOpen("login");
      }

      try {
        if (hasFavorited) {
          await axios.delete(`/api/favorites/${listingId}`);
        } else {
          await axios.post(`/api/favorites/${listingId}`);
        }
        router.refresh();
        toast.success("Item added to favorites");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, listingId, hasFavorited, authModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
