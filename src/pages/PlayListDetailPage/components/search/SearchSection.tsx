import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../../common/components/LoadingSpinner";
import useSearchItems from "../../../../hooks/useSearchItems";
import { SEARCH_TYPE } from "../../../../models/search";

const useDebounce = <T,>(value: T, delay = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const SearchSection = () => {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300);

  const shouldSearch =
    debouncedQuery.length >= 2 && debouncedQuery.trim().length >= 1;

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSearchItems({
      q: shouldSearch ? debouncedQuery : "",
      type: [SEARCH_TYPE.Track],
    });

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];

  return (
    <Box display="flex" flexDirection="column" gap={3} height="100%">
      {/* 검색 창 */}
      <SearchInput value={query} onChange={setQuery} />

      {/* 결과 영역 */}
      <Box
        flex={1}
        minHeight={0}
        overflow="auto"
        sx={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.2) transparent",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "3px",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.3)",
          },
        }}
      >
        {/* 검색어 없음 */}
        {query.trim().length === 0 && (
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography color="rgba(255,255,255,0.4)" fontWeight={500}>
              Find your favorite songs or artists
            </Typography>
          </Box>
        )}
        {/* 로딩 */}
        {query.trim().length > 0 && isLoading && (
          <Box padding="120px">
            <LoadingSpinner />
          </Box>
        )}

        {/* 결과 */}
        {query.trim().length > 0 && !isLoading && (
          <SearchResultList
            tracks={tracks}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </Box>
    </Box>
  );
};

export default SearchSection;

/*
useDebounce 훅

- 값(value)이 변경될 때마다 즉시 반영하지 않고,
  일정 시간(delay) 동안 변경이 멈췄을 때만
  최종 값을 반환하는 커스텀 훅이다.

- 주로 검색 입력값처럼
  "연속적으로 빠르게 변경되는 값"에 사용하여
  불필요한 API 호출이나 연산을 줄이기 위해 사용한다.

예시:
  사용자가 "봄" → "봄 " → "봄 은" 처럼 타이핑할 경우,
  매 입력마다 API를 호출하지 않고
  입력이 멈춘 뒤(delay ms 후)에 한 번만 반영된다.
*/

/*
const useDebounce = <T,>(value: T, delay = 300): T => {
    // 디바운스된 값을 상태로 관리
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      // value가 변경될 때마다 타이머를 새로 설정
      const timer = setTimeout(() => {
        // delay 시간이 지난 후에만 값을 업데이트
        setDebouncedValue(value);
      }, delay);

      // value 또는 delay가 변경되면
      // 이전 타이머를 취소하여
      // 마지막 변경만 반영되도록 함
      return () => clearTimeout(timer);
    }, [value, delay]);

    // delay 이후 확정된 값을 반환
    return debouncedValue;
  };

  export default useDebounce;
*/
