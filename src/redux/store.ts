import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import searchSlice from './slices/searchSlice';
import cartSlice from './slices/cartSlice';
import pizzasSlice from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    searchSlice,
    cartSlice,
    pizzasSlice,
  },
});

// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// export type RootState = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store.dispatch>;
// export type AppDispatch = AppStore['dispatch'];
