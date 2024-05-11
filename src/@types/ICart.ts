import { IPizza } from './IPizza';

export interface ICart {
  totalPrice: number;
  countPizzas: number;
  pizzas: IPizza;
}
