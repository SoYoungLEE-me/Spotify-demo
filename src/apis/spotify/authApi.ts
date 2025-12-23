import axios from "axios";
import { client_id, client_secret } from "../../configs/authConfig";
import type { ClientCredentialTokenResponse } from "../../models/auth";

const encodeBase64 = (data: string): string => {
  return btoa(data);
};

export const getClientCredentialToken =
  async (): Promise<ClientCredentialTokenResponse> => {
    try {
      const body = new URLSearchParams({
        grant_type: "client_credentials",
      });

      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        body,
        {
          headers: {
            Authorization: `Basic ${encodeBase64(
              `${client_id}:${client_secret}`
            )}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Fail to fetch client credential token", error);
      throw error;
    }
  };
