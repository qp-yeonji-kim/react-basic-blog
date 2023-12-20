import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: []
}
const toastSlice = createSlice({
  name: 'toast',
  initialState, // 초기값
  reducers: { // 함수를 업데이트 하는 함수: 여기서만 state를 변경해줘야 함.
    addToast: (state, action) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => {
        return toast.id !== action.payload
      })
    }
  }
})

// console.log(toastSlice.actions.addToast()); // payload와 type을 가진 객체가 만들어진다.
// console.log(toastSlice.actions.addToast('hello')); // payload에 hello들어감.

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;