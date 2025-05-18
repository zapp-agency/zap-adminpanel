import type { RootState } from '../../index';

export const selectDirection = (state: RootState) => state.direction.direction;
