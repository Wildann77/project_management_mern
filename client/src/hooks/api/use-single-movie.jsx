// hooks/useMovie.js
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleMovie } from "@/services/movieService";

export const useMovie = (id) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getSingleMovie(id),
    enabled: !!id, // hanya jalan kalau id ada
    staleTime: 1000 * 60 * 5, // data fresh 5 menit
    cacheTime: 1000 * 60 * 30, // simpan cache 30 menit
    placeholderData: () => {
      // coba ambil data dari list movie (["movies"]) kalau ada
      const movies = queryClient.getQueryData(["movies"]);
      return movies?.find((m) => m.id === id);
    },
  });
};
