import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICart {
  totalPrice: number;
  pizzas: ICartPizzas[];
}

interface ActionPizza {
  id: number;
  imageUrl: string;
  name: string;
  type: string;
  size: string;
  price: number;
}

interface ICartPizzas extends ActionPizza {
  count: number;
}

const initialState: ICart = {
  totalPrice: 0,
  pizzas: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action: PayloadAction<ActionPizza>) {
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
    },
    minusPizza(state, action: PayloadAction<number>) {
      const findPizza = state.pizzas.find((obj) => obj.id === action.payload);
      if (findPizza && findPizza.count > 1) {
        findPizza.count--;
      } else {
        state.pizzas = state.pizzas.filter((obj) => obj.id !== action.payload);
      }
    },
    removePizza(state, action: PayloadAction<number>) {
      state.pizzas = state.pizzas.filter((obj) => obj.id !== action.payload);
    },
    clearPizzas(state) {
      state.pizzas = [];
      state.totalPrice = 0;
    },
  },
});

// export const selectCart = (state) => state.cartSlice;

export const { addPizza, removePizza, clearPizzas, minusPizza } = cartSlice.actions;

export default cartSlice.reducer;
