import { spotifyGet } from "../../utils/spotifyClient";
import type { SearchRequest, SearchResponse } from "../../models/search";

export const getSearchForItem = async (
  token: string,
  request: SearchRequest
): Promise<SearchResponse> => {
  return spotifyGet<SearchResponse>("/search", token, {
    q: request.q,
    type: request.type.join(","),
    limit: request.limit ?? 20,
    offset: request.offset ?? 0,
    market: request.market,
  });
};
