import type { GetNewReleasesResponse } from "../../models/album";
import { spotifyGet } from "./client";

export const getNewReleases = async (
  token: string
): Promise<GetNewReleasesResponse> => {
  return spotifyGet<GetNewReleasesResponse>(
    "/browse/new-releases?limit=6",
    token
  );
};
