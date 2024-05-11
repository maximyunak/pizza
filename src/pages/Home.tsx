import React, { useCallback, useEffect, useRef } from 'react';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { IPizza } from '../@types/IPizza';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Home: React.FC = () => {
  const { categoryId, sortBy, currentPage } = useAppSelector((state) => state.filterSlice);
  const { valueSearch } = useAppSelector((state) => state.searchSlice);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useAppSelector((state) => state.pizzasSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const search = valueSearch ? `&search=${valueSearch}` : '';
  const page = `page=${currentPage}`;

  const fetchData = useCallback(async () => {
    dispatch(
      fetchPizzas({
        sortBy,
        search,
        page,
        categoryId,
      }),
    );
  }, [categoryId, dispatch, page, search, sortBy]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty) || {
        name: 'популярности',
        sortProperty: 'rating',
      };
      if (sort) {
        dispatch(
          setFilters({
            currentPage: Number(params.currentPage),
            categoryId: Number(params.categoryId),
            sortBy: sort,
          }),
        );
      }
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isSearch.current) {
      fetchData();
    }

    isSearch.current = false;

    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortBy.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, sortBy, valueSearch, fetchData, navigate]);

  // useEffect(() => {}, [categoryId, currentPage, sortBy, valueSearch]);

  const pizzas = items
    // .filter((value) => value.name.toLowerCase().includes(searchValue))
    .map((obj: IPizza) => <PizzaBlock key={obj.id} {...obj} />);
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
