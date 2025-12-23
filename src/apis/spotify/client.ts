import axios from "axios";
import { SPOTIFY_BASE_URL } from "../../configs/commonConfig";

export const spotifyGet = async <T>(
  endpoint: string,
  token: string
): Promise<T> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Spotify API request failed");
  }
};

const handleAxiosError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    console.error(error.response);
    return new Error(error.response?.data?.error?.message ?? defaultMessage);
  }

  return new Error(defaultMessage);
};
