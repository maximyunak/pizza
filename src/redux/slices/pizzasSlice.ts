import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizza } from '../../@types/IPizza';
import { SortItem } from './filterSlice';

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface FetchPizzasArgs {
  categoryId: number;
  sortBy: SortItem;
  search: string;
  page: string;
}

export const fetchPizzas = createAsyncThunk<IPizza[], FetchPizzasArgs>(
  'pizza/fetchPizzas',
  async ({ categoryId, sortBy, search, page }) => {
    const { data } = await axios.get(
      `https://65005f6f18c34dee0cd4cd4c.mockapi.io/items?limit=4&${page}&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortBy.sortProperty}${search}`, //&sortBy=${sortType.sort}${search}
    );

    return data;
  },
);

interface IPizzasSlice {
  items: IPizza[];
  status: Status;
}

const initialState: IPizzasSlice = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzaItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setPizzaItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
