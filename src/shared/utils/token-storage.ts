import type { UserLoginDto } from "../../features/auth/types/auth.types";

const USER_ID = "user_id";
const FIRST_NAME = "first_name";
const LAST_NAME = "last_name";
const EMAIL = "email";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const setUserSession = (loginResponse: UserLoginDto) => {
  localStorage.setItem(USER_ID, loginResponse.userId);
  localStorage.setItem(FIRST_NAME, loginResponse.firstName);
  localStorage.setItem(LAST_NAME, loginResponse.lastName);
  localStorage.setItem(EMAIL, loginResponse.email);

  localStorage.setItem(ACCESS_TOKEN_KEY, loginResponse.tokenDto.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, loginResponse.tokenDto.refreshToken);
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getUserInfo = () => {
  return {
    UserId: localStorage.getItem(USER_ID),
    FirstName: localStorage.getItem(FIRST_NAME),
    LastName: localStorage.getItem(LAST_NAME),
    Email: localStorage.getItem(EMAIL),
  };
};
