import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "@/reducers/deviceReducer";
import authReducer from "@/reducers/authReducer";

const store = configureStore({
  reducer: {
    device: deviceReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
