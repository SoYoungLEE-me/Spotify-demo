import { spotifyGet } from "./client"; // 또는 axios 인스턴스
import type { PlaylistTrackObject } from "../../models/playlist";

// 응답 타입: items 배열이 바로 옴 (/tracks 엔드포인트 사용 시)
export interface PlaylistTracksResponse {
  items: PlaylistTrackObject[];
  total?: number;
}

export const getChartPlaylistTracks = async (
  token: string,
  playlistId: string
): Promise<PlaylistTracksResponse> => {
  // 1. 공백 제거 (필수 안전장치)
  const cleanId = playlistId.trim();

  // 2. 요청할 주소 (쿼리 파라미터 제외하고 깔끔하게)
  // 플레이리스트의 "트랙 목록"만 가져오는 엔드포인트
  const endpoint = `/playlists/${cleanId}/tracks`;

  // 3. 쿼리 파라미터 설정 (여기가 핵심! ⭐)
  // 이렇게 객체로 만들어서 넘기면, axios가 알아서 주소로 예쁘게 변환해줍니다.
  // market은 뺐습니다. (공식 차트 404 원인 1순위라 제거)
  const params = {
    fields: "items(track(id,name,artists(name),album(images)))",
    limit: 10, // 혹시 모르니 10개만 가져오라고 명시
  };

  // 4. URLSearchParams를 사용해 쿼리 스트링 생성
  const queryString = new URLSearchParams(params as any).toString();

  // 5. 최종 호출
  return spotifyGet<PlaylistTracksResponse>(
    `${endpoint}?${queryString}`,
    token
  );
};
