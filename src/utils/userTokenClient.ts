import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { handleAxiosError } from "./handleAxiosError";

export const spotifyUserGet = async <T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>
): Promise<T> => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });

    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Spotify user API request failed");
  }
};
