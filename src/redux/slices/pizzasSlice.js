import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({ categoryId, sortBy, search, page }, thunkApi) => {
    const { data } = await axios.get(
      `https://65005f6f18c34dee0cd4cd4c.mockapi.io/items?limit=4&${page}&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortBy.sortProperty}&search=${search}`, //&sortBy=${sortType.sort}${search}
    );

    return data;
  },
);

const initialState = {
  items: [],
  status: '',
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
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading';
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'ok';
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error';
      state.pizzas = [];
    });
  },
});

export const { setPizzaItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
