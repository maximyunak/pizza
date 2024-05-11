import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ISearch {
  valueSearch: string;
}

const initialState: ISearch = {
  valueSearch: '',
};

const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.valueSearch = action.payload;
    },
  },
});

export const { setSearch } = SearchSlice.actions;
export default SearchSlice.reducer;
