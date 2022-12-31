import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setMemos: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMemos } = memoSlice.actions;
export default memoSlice.reducer;
