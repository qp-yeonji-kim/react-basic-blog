import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: []
}
const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: { // state를 업데이트 해주는 함수가 들어간다.
    addToasts: (state, action) => {
      state.toasts.push(action.payload);
    }
  }
})

export const { addToasts } = toastSlice.actions;

export default toastSlice.reducer;