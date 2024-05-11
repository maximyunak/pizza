import React from 'react';

import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state: any) => state.filterSlice);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
