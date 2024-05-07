import React from 'react';
import emptyCart from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая</h2>
      <p>
        Вероятнее всего, вы ещё ничего не заказывали
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу
      </p>

      <img src={emptyCart} alt="empty cart" />

      <Link to="/" className="button button--black">
        Вернуться назад
      </Link>
    </div>
  );
};

export default CartEmpty;
