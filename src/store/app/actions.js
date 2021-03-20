import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';

export const registerSuccess = createAction(types.REGISTER_SUCCESS);
export const loginSuccess = createAction(types.LOGIN_SUCCESS);
export const logout = createAction(types.LOGOUT_SUCCESS);
