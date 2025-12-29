import { useInfiniteQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/spotify/playlistApi";
import type { GetCurrentUserPlaylistsRequest } from "../models/playlist";

const useGetCurrentUserPlaylists = ({
  limit,
}: GetCurrentUserPlaylistsRequest) => {
  return useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({ pageParam = 0 }) => {
      return getCurrentUserPlaylists({ limit, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
    },
  });
};

export default useGetCurrentUserPlaylists;

/**
 * useInfiniteQuery를 사용한 무한 로딩 훅
 *
 * - Spotify API는 offset 기반 pagination을 사용한다.
 * - react-query의 pageParam을 offset으로 매핑해 사용한다.
 *
 * 동작 흐름:
 *
 * 1. 첫 요청 시
 *    - initialPageParam(0)이 pageParam으로 전달된다.
 *    - offset = 0 → 첫 페이지 요청
 *
 * 2. 다음 페이지 요청 시
 *    - getNextPageParam에서 마지막 page의 next URL을 확인한다.
 *    - next가 null이면 더 이상 불러올 페이지가 없다.
 *
 * 3. next URL이 존재하면
 *    - URL의 query string에서 offset 값을 추출한다.
 *    - 추출한 offset을 다음 pageParam으로 반환한다.
 *
 * 4. 반환된 pageParam은
 *    - 다음 queryFn 호출 시 offset으로 사용된다.
 *
 * 결과적으로:
 * - react-query가 offset 값을 관리하며
 * - fetchNextPage() 호출 시 자동으로 다음 페이지를 요청한다.
 */
