import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sortBy: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortBy = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sortBy = action.payload.sort;
      state.currentPage = +action.payload.currentPage;
      state.categoryId = +action.payload.categoryId;
    },
  },
});

export const { setCategoryId, setCurrentPage, setSortType, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
