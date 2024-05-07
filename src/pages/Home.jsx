import React, { useEffect, useRef, useState } from 'react';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
  const { categoryId, sortBy, currentPage } = useSelector((state) => state.filterSlice);
  const { valueSearch } = useSelector((state) => state.searchSlice);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector((state) => state.pizzasSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const search = valueSearch ? `&search=${valueSearch}` : '';
  const page = `page=${currentPage}`;

  const fetchData = async () => {
    dispatch(
      fetchPizzas({
        sortBy,
        search,
        page,
        categoryId,
      }),
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchData();
    }

    isSearch.current = false;

    // window.scrollTo(0, 0);
  }, [categoryId, currentPage, sortBy, valueSearch]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortBy.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, sortBy, valueSearch]);

  const pizzas = items
    // .filter((value) => value.name.toLowerCase().includes(searchValue))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, id) => <Skeleton key={id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items" style={{ height: '530px' }}>
        {status === 'loading' ? skeletons : pizzas}
      </div>
      {/* <div className="content__items">{pizzas}</div> */}
      <Pagination />
    </div>
  );
};

export default Home;
