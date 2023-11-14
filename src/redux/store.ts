import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice'
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    boards: boardReducer,
    // Add other reducers here if needed
  },
});

export default store;