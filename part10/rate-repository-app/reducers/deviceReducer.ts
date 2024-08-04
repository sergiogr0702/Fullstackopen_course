import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const deviceSlice = createSlice({
  name: "device",
  initialState: "",
  reducers: {
    setDevice: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setDevice } = deviceSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDevice = (state: RootState) => state.device;

export default deviceSlice.reducer;
