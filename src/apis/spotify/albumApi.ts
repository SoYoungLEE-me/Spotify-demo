import type { GetNewReleasesResponse } from "../../models/album";
import { spotifyGet } from "../../utils/clientTokenClient";

export const getNewReleases = async (
  token: string
): Promise<GetNewReleasesResponse> => {
  return spotifyGet<GetNewReleasesResponse>(
    "/browse/new-releases?limit=6",
    token
  );
};
