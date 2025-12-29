import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { handleAxiosError } from "./handleAxiosError";

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
