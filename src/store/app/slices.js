import { SLICE_NAME } from './action-types';

const getSlice = (store) => store[SLICE_NAME];
export const getUser = (store) => getSlice(store).user;
export const getUsername = (store) => getUser(store) && getUser(store).name;
export const getUserId = (store) => getUser(store) && getUser(store).userId;
export const getToken = (store) => getUser(store) && getUser(store).token;
export const getAuthorized = (store) => getSlice(store).auth;
