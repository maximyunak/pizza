import React, { createContext, useEffect, useState } from 'react';
import './scss/app.scss';
import Header from './components/Header';

import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/reducers/filterSlice';

export const SearchContext = createContext();

const App = () => {
  const [searchValue, setSearchValue] = useState('');

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="wrapper">
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
      {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </SearchContext.Provider> */}
    </div>
  );
};

export default App;
