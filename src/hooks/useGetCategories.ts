import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategories } from "../apis/spotify/categoryApi";
import type { GetCategoriesRequest } from "../models/category";
import useClientCredentialToken from "./useClientCredentialToken";

const DEFAULT_LIMIT = 20;

const useGetCategories = (params?: GetCategoriesRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["categories", params],
    enabled: !!clientCredentialToken,

    initialPageParam: 0,

    queryFn: ({ pageParam }) => {
      return getCategories(clientCredentialToken!, {
        ...params,
        limit: params?.limit ?? DEFAULT_LIMIT,
        offset: pageParam,
      });
    },
    getNextPageParam: (lastPage) => {
      const page = lastPage.categories;
      if (!page.next) return undefined;
      return page.offset + page.limit;
    },
  });
};

export default useGetCategories;
