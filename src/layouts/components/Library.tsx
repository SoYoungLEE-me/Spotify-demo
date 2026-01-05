import { Box } from "@mui/material";
import EmptyPlayList from "./EmptyPlayList";
import LibraryPlaylist from "./LibraryPlaylist";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { useState } from "react";
import { useNavigate } from "react-router";

const Library = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);

  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCurrentUserPlaylists({
      limit: 10,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const playlists = data?.pages.flatMap((page) => page.items) ?? [];

  if (!data || playlists.length === 0) {
    return <EmptyPlayList />;
  }

  const handleClick = (id: string) => {
    setActiveId(id);
    navigate(`/playlist/${id}`);
  };

  return (
    <Box
      flex={1}
      minHeight={0}
      overflow="scroll"
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
      {playlists.map((playlist) => (
        <LibraryPlaylist
          key={playlist.id}
          playlist={playlist}
          isActive={playlist.id === activeId}
          onClick={handleClick}
        />
      ))}

      {/* Infinite scroll sentinel */}
      <Box ref={ref} display="flex" justifyContent="center" py={1}>
        {isFetchingNextPage && <ScaleLoader color="#F43F5E" height={18} />}
      </Box>
    </Box>
  );
};

export default Library;

/**
 * useInfiniteQuery의 data 구조:
 *
 * data = {
 *   pages: [
 *     { items: Playlist[] }, // 1페이지
 *     { items: Playlist[] }, // 2페이지
 *     { items: Playlist[] }, // 3페이지 ...
 *   ],
 *   pageParams: [...]
 * }
 *
 * 따라서 data.pages는 "페이지 배열"이고,
 * 각 page.items는 "플레이리스트 배열"이다.
 *
 * pages.map(page => page.items)를 하면
 *   Playlist[][] (이중 배열)이 되기 때문에
 *   바로 렌더링할 수 없다.
 *
 * flatMap을 사용하면:
 *   1) page => page.items 로 map 한 뒤
 *   2) 결과를 한 단계(flat) 펼쳐서
 *
 * Playlist[] 형태로 변환해준다.
 *
 * → infinite scroll에서
 *   여러 페이지의 items를
 *   하나의 리스트로 렌더링하기 위해 사용한다.
 */

/**
 * IntersectionObserver + useInfiniteQuery 기반 무한 스크롤 구현 방식
 *
 * 1. useInView는 화면에 "보이는지 여부"를 감지하는 훅이다.
 *    - ref: 관찰할 DOM 요소에 연결
 *    - inView: 해당 요소가 화면에 보이면 true
 *
 * 2. 무한 스크롤에서는 리스트 맨 아래에
 *    "sentinel(감시용 빈 요소)"를 두고
 *    이 요소가 화면에 들어오는 순간 다음 페이지를 요청한다.
 *
 * 3. threshold: 0
 *    - sentinel이 화면에 1px이라도 보이면 inView === true
 *    - 무한 스크롤에서 가장 일반적인 설정
 *
 * 4. rootMargin을 사용하면
 *    - 실제 바닥에 닿기 전에 미리 로딩 가능
 *    - 예: "100px" → 바닥 100px 전에 다음 페이지 요청
 *
 * 5. useEffect에서 inView 변화를 감지해
 *    - 다음 페이지가 있고 (hasNextPage)
 *    - 현재 다음 페이지를 불러오는 중이 아닐 때
 *    fetchNextPage()를 호출한다.
 *
 * 6. isFetchingNextPage 체크는 필수
 *    - observer가 연속으로 트리거되면서
 *      중복 요청이 발생하는 것을 방지한다.
 *
 * 7. 이 방식의 장점:
 *    - scroll 이벤트를 직접 다루지 않아 성능이 좋다
 *    - 코드가 단순하고 가독성이 좋다
 *    - react-query의 pagination 구조와 잘 맞는다
 *
 * 핵심 흐름:
 *
 * [스크롤 ↓]
 *   ↓
 * sentinel(ref)가 화면에 등장
 *   ↓
 * inView === true
 *   ↓
 * fetchNextPage()
 */
