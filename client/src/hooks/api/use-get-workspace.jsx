import { useQuery } from "@tanstack/react-query";
import { getWorkspaceByIdQueryFn } from "@/lib/api";

const useGetWorkspaceQuery = (workspaceId) => {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getWorkspaceByIdQueryFn(workspaceId),
    staleTime: 0,
    retry: 2,
    enabled: !!workspaceId,
  });
};

export default useGetWorkspaceQuery;
