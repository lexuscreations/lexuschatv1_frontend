const version = "/api/v1";

export const PING_ENDPOINT = `/ping`;
export const USER_LOGIN_ENDPOINT = `${version}/user/login`;
export const USER_LOGOUT_ENDPOINT = `${version}/user/logout`;
export const USER_SEARCH_ENDPOINT = `${version}/user/search`;
export const USER_REGISTER_ENDPOINT = `${version}/user/register`;
export const GET_MESSAGE_OF_USER_ENDPOINT = (to_userId) =>
  `${version}/message/${to_userId}`;
export const GET_USER_CONVERSATIONAL_USERS_ENDPOINTS = `${version}/user/conversational_users`;
export const SEND_MESSAGE_TO_USER_ENDPOINT = (to_userId) =>
  `${version}/message/send/${to_userId}`;
