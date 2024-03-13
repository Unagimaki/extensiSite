import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ModalNames } from 'features/ModalViewer/ModalViewer'

export interface CounterState {
  modalId: ModalNames[]
}

const initialState: CounterState = {
  modalId: [],
}

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    modalOpen: (state, action: PayloadAction<ModalNames>) => {
      if (!state.modalId.find(item => item === action.payload)) {
        state.modalId.push(action.payload)
      }
    },

    modalClose: (state, action: PayloadAction<ModalNames>) => {
      state.modalId = state.modalId.filter(modals => modals !== action.payload)
    },
  },
})

export const { modalOpen, modalClose } = modalSlice.actions
export default modalSlice.reducer
