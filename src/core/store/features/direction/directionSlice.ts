import { createSlice } from '@reduxjs/toolkit';
import type { Direction } from '../../types';

interface directionState {
  direction: Direction;
}

const initialState: directionState = {
  direction: 'ltr',
};

export const directionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    changeDirection: (state) => {
      document.documentElement.style.direction = state.direction === 'rtl' ? 'ltr' : 'rtl';
      state.direction = state.direction === 'rtl' ? 'ltr' : 'rtl';
    },
  },
});

export const { changeDirection } = directionSlice.actions;
export default directionSlice.reducer;
