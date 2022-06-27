import jwt_decode from "jwt-decode";

export const decodeToken = (token: string) => {
  try {
    return jwt_decode(token);
  } catch (error) {
    return null;
  }
};