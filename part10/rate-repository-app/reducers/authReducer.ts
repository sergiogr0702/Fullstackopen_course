import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccessToken } from "@/types";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    setToken: (state, action: PayloadAction<AccessToken>) => {
      return action.payload;
    },
    removeToken: (state) => {
      return {};
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export const selectAuthStorage = (state: RootState) => state.auth;

export const getAccessToken = () => {
  return async (_dispatch: AppDispatch) => {
    try {
      const token = await AsyncStorage.getItem(`auth:token`);
      const expiresAt = await AsyncStorage.getItem(`auth:expiration`);
      if (!token || !expiresAt) {
        return undefined;
      }
      return {
        token,
        expiresAt: new Date(expiresAt),
      };
    } catch (error) {
      console.error("Failed to get access token:", error);
      return undefined;
    }
  };
};

export const setAccessToken = (accessToken: AccessToken) => {
  return async (dispatch: AppDispatch) => {
    try {
      await AsyncStorage.setItem(`auth:token`, accessToken.token);
      await AsyncStorage.setItem(
        `auth:expiration`,
        accessToken.expiresAt.toDateString()
      );
      dispatch(setToken(accessToken));
    } catch (error) {
      console.error("Failed to set access token:", error);
    }
  };
};

export const removeAccessToken = () => {
  return async (dispatch: AppDispatch) => {
    try {
      await AsyncStorage.removeItem(`auth:token`);
      await AsyncStorage.removeItem(`auth:expiration`);
      dispatch(removeToken());
    } catch (error) {
      console.error("Failed to remove access token:", error);
    }
  };
};

export default authSlice.reducer;
