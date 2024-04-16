import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/filterSlice';

export const store = configureStore({
  reducer: { counter: counterReducer },
});
