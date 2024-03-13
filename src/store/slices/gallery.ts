import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  id: string
}

const initialState: CounterState = {
  id: '/',
}

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    changeData: (state, payload) => {
      state.id = payload.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeData } = gallerySlice.actions

export default gallerySlice.reducer
