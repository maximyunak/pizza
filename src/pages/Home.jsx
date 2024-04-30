import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import axios from "axios";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = () => {
  const { categoryId, sortBy, currentPage } = useSelector(
    (state) => state.filterSlice
  );
  const { valueSearch } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);

    const search = valueSearch ? `&search=${valueSearch}` : "";
    const page = `page=${currentPage}`;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://65005f6f18c34dee0cd4cd4c.mockapi.io/items?limit=4&${page}&${
            categoryId > 0 ? `category=${categoryId}` : ""
          }&sortBy=${sortBy.sortProperty}&filter=${search}` //&sortBy=${sortType.sort}${search}
        );

        setItems(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log("err");
      }
    };

    fetchData();

    // window.scrollTo(0, 0);
  }, [categoryId, currentPage, sortBy, valueSearch]);

  const pizzas = items
    // .filter((value) => value.name.toLowerCase().includes(searchValue))
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, id) => <Skeleton key={id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
};

export default Home;
