import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SortItem {
  name: string;
  sortProperty: 'rating' | 'name' | 'price' | '-rating' | '-name' | '-price';
}

interface IFilter {
  categoryId: number;
  currentPage: number;
  sortBy: SortItem;
}

const initialState: IFilter = {
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortItem>) {
      state.sortBy = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilter>) {
      state.sortBy = action.payload.sortBy;
      state.currentPage = +action.payload.currentPage;
      state.categoryId = +action.payload.categoryId;
    },
  },
});

export const { setCategoryId, setCurrentPage, setSortType, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
