import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    globalLoading: false,
    chatBackground: "",
    isSettingsPageOpen: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    setIsSettingsPageOpen: (state, action) => {
      state.isSettingsPageOpen = action.payload;
    },
    setChatBackground: (state, action) => {
      state.chatBackground = action.payload;
    },
  },
});

export const { setGlobalLoading, setChatBackground, setIsSettingsPageOpen } =
  uiSlice.actions;
export default uiSlice.reducer;
