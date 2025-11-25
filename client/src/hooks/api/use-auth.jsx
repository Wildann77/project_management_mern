import { useQuery } from "@tanstack/react-query";
import { getCurrentUserQueryFn } from "@/lib/api";

const useAuth = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUserQueryFn,
    staleTime: 0,
    retry: 2,
  });
};

export default useAuth;
