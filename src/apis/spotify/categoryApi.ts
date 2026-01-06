import { spotifyGet } from "../../utils/spotifyClient";
import type {
  CategoriesResponse,
  GetCategoriesRequest,
} from "../../models/category";

export const getCategories = async (
  token: string,
  params: GetCategoriesRequest
): Promise<CategoriesResponse> => {
  return spotifyGet<CategoriesResponse, GetCategoriesRequest>(
    "/browse/categories",
    token,
    params
  );
};
