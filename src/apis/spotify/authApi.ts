import axios from "axios";
import { client_id, client_secret } from "../../configs/authConfig";
import type {
  ClientCredentialTokenResponse,
  ExchangeTokenResponse,
} from "../../models/auth";
import { REDIRECT_URI } from "../../configs/commonConfig";

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

export const exchangeToken = async (
  code: string,
  codeVerifier: string
): Promise<ExchangeTokenResponse> => {
  try {
    const url = "https://accounts.spotify.com/api/token";

    if (!client_id || !REDIRECT_URI) {
      throw new Error("Mission required parameters");
    }

    const body = new URLSearchParams({
      client_id: client_id,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    console.error("fail to fetch token");
    throw error;
  }
};
