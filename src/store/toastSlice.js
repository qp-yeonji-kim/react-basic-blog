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
    },
    removeToasts: (state, action) => {
      // payload로 삭제하고 싶은 게시물의 id를 받아온다.
      state.toasts = state.toasts.filter(toast => {
        return toast.id !== action.payload
      })
    }
  }
})

export const { addToasts, removeToasts } = toastSlice.actions;

export default toastSlice.reducer;