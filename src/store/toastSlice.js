import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: []
}
const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: { // 함수를 업데이트 하는 함수

  }
})

export default toastSlice.reducer;