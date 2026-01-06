import type { Image } from "./commonType";
import type { ApiResponse } from "./apiResponse";

export interface GetCategoriesRequest {
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface CategoryObject {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

export interface CategoriesResponse {
  categories: ApiResponse<CategoryObject>;
}
