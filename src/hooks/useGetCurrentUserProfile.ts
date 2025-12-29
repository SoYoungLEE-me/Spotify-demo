import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/spotify/userApi";
import type { User } from "../models/user";

const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
  const access_token = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    enabled: !!access_token,
  });
};

export default useGetCurrentUserProfile;

//엑세스 토큰이 들어왔냐를 기준으로 로그인 여부를 확인하여 프로파일을 불러오도록 실행
//왜냐면 로그인 했을 때만 필요하니까
