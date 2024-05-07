import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  countPizzas: 0,
  pizzas: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      const findPizza = state.pizzas.find((obj) => obj.id === action.payload.id);

      if (findPizza) {
        findPizza.count++;
      } else {
        state.pizzas.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.pizzas.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);

      state.countPizzas = state.pizzas.reduce((sum, obj) => {
        return obj.count + sum;
      }, 0);
    },
    minusPizza(state, action) {
      const findPizza = state.pizzas.find((obj) => obj.id === action.payload);
      if (findPizza?.count > 1) {
        findPizza.count--;
      } else {
        state.pizzas = state.pizzas.filter((obj) => obj.id !== action.payload);
      }
    },
    removePizza(state, action) {
      state.pizzas = state.pizzas.filter((obj) => obj.id !== action.payload);
    },
    clearPizzas(state, action) {
      state.pizzas = [];
      state.totalPrice = 0;
      state.countPizzas = 0;
    },
  },
});

export const selectCart = (state) => state.cartSlice;

export const { addPizza, removePizza, clearPizzas, minusPizza } = cartSlice.actions;

export default cartSlice.reducer;
