import React from 'react';
import { getPagesArray } from '../../../utils/pages';
import MyButton from '../button/MyButton';

const Pagination = ({ totalPages, page, setPage}) => {
    const pagesArray = getPagesArray(totalPages)

    return (
        <div className="page-wrapper">
        {pagesArray.map(p => 
          <MyButton
            onClick={() => setPage(p)}
            key={p}
            className={page === p ? 'page-wrapper__item current' : 'page-wrapper__item'}
          >{p}</MyButton>
        )}
      </div>
    );
};

export default Pagination;