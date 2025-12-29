import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

export const spotifyUserGet = async <T>(endpoint: string): Promise<T> => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("Access token not found");
  }

  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Spotify user API request failed");
  }
};

const handleAxiosError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    return new Error(error.response?.data?.error?.message ?? defaultMessage);
  }
  return new Error(defaultMessage);
};
