import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { handleAxiosError } from "./handleAxiosError";

export const spotifyGet = async <T>(
  endpoint: string,
  token: string,
  params?: Record<string, string | number | undefined>
): Promise<T> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Spotify API request failed");
  }
};

export const spotifyPost = async <T>(
  endpoint: string,
  token: string,
  body?: unknown
): Promise<T> => {
  try {
    const response = await axios.post(`${SPOTIFY_BASE_URL}${endpoint}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Spotify API POST request failed");
  }
};

export const spotifyPut = async <T>(
  endpoint: string,
  token: string,
  body?: unknown
): Promise<T> => {
  try {
    const response = await axios.put(`${SPOTIFY_BASE_URL}${endpoint}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Spotify API POST request failed");
  }
};
