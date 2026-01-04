import * as signalR from "@microsoft/signalr";
import { getAccessToken } from "../../shared/utils/token-storage";

export const createOopsieConnection = () => {
  const token = getAccessToken();

  if (!token) {
    throw new Error("Access token bulunamadı. Kullanıcı login değil.");
  }

  return new signalR.HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_OOPSIE_API_URL}/oopsieHub`, {
      accessTokenFactory: () => token,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .withAutomaticReconnect()
    .build();
};
