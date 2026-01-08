import type { InfiniteData } from "@tanstack/react-query";
import type { Tracks } from "../../../../models/track";
import PlaylistItem from "./PlaylistItem";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

interface Props {
  playlistItems: InfiniteData<Tracks>;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

const PlaylistItemsContainer = ({
  playlistItems,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) => {
  const items = playlistItems.pages.flatMap((page) => page.items);

  const { ref, inView } = useInView({
    rootMargin: "200px 0px",
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Box>
      {items.map((item, index) => (
        <PlaylistItem
          key={`${item.added_at}-${index}`}
          item={item}
          index={index}
        />
      ))}

      {hasNextPage && (
        <Box ref={ref} display="flex" justifyContent="center" py={2}>
          <CircularProgress size={20} sx={{ color: "primary.main" }} />
        </Box>
      )}

      <div ref={ref} style={{ height: 1 }} />
    </Box>
  );
};

export default PlaylistItemsContainer;

/**
 * InfiniteQuery 결과는 pages 단위로 데이터가 들어온다.
 *
 * pages = [
 *   { items: [ ... ], offset: 0 },
 *   { items: [ ... ], offset: 20 },
 *   ...
 * ]
 *
 * 1. 강의에서 말한 공식:
 *    pageIndex * pageLimit + itemIndex + 1
 *
 *    "페이지를 나눠서 렌더링할 때,
 *        전체 리스트 기준에서 몇 번째 아이템인지 계산하는 공식"
 *
 *    예)
 *    - pageLimit = 20
 *    - 2번째 페이지(pageIndex = 1)의 첫 아이템(itemIndex = 0)
 *      → 1 * 20 + 0 + 1 = 21
 *
 * 2그런데 여기서는 flatMap을 사용함
 *
 *    pages.flatMap(page => page.items)
 *
 *    모든 페이지의 items를 하나의 배열로 평탄화(flatten)
 *    결과적으로 "전체 리스트"가 됨
 *
 *    따라서 map에서 받는 index는
 *    이미 전체 기준 index가 된다.
 *
 * 3️. 그래서 여기서는
 *
 *    index + 1
 *
 *    만으로도
 *    1, 2, 3, 4, ... 연속된 번호를 정확히 표현할 수 있음
 *
 * 결론:
 * - page 단위로 렌더링 → pageIndex * limit + itemIndex + 1
 * - flatMap으로 전체 배열 생성 → index + 1 (지금 방식)
 */
