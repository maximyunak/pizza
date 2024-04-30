import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  valueSearch: '',
};

const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.valueSearch = action.payload;
    },
  },
});

export const { setSearch } = SearchSlice.actions;
// export const { setSortType } = filterSlice.actions;

export default SearchSlice.reducer;
