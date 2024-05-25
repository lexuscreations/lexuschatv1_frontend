import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    globalLoading: false,
    chatBackgroundImage: "",
    settingsPageOpen: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    setSettingsPageOpen: (state, action) => {
      state.settingsPageOpen = action.payload;
    },
    setChatBackgroundImage: (state, action) => {
      state.chatBackgroundImage = action.payload;
    },
  },
});

export const { setGlobalLoading, setSettingsPageOpen, setChatBackgroundImage } =
  uiSlice.actions;
export default uiSlice.reducer;
