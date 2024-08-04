import { configureStore } from "@reduxjs/toolkit";
import repositoryReducer from "@/reducers/repositoryReducer";
import deviceReducer from "@/reducers/deviceReducer";

const store = configureStore({
  reducer: {
    repositories: repositoryReducer,
    device: deviceReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
