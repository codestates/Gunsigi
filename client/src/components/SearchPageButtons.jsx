import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../actions/searchAction';
import '../styles/search/SearchPageButtons.scss';

function SearchPageButtons() {
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.searchReducer);
  const { productCount, totalPage, startPage, endPage, currentPage } =
    searchState;
  const buttonArr = Array.from({ length: totalPage }, (n, i) => i + 1);
  const showButtons = buttonArr.slice(startPage, endPage);
  //const [currentPage, setCurrentPage] = useState(1);
  // First는 1페이지일때는 안뜨고 2부터?
  // 현재 페이지는 글자 진하게

  const handleClickPageNum = (e) => {
    dispatch(setCurrentPage(e.target.value * 1, totalPage));
  };
  const handlePrevButton = () => {
    // if (currentPage === 1) {
    //   // 예외처리
    //   return;
    // }
    // if (currentPage % 10 === 1) {
    //   const changedStart = startPage - 10;
    //   const changedEnd = endPage - 10;
    //   dispatch(setStartEndPage(changedStart, changedEnd));
    // }
    dispatch(setCurrentPage(currentPage - 1, totalPage));
  };

  const handleNextButton = () => {
    // if (currentPage === totalPage) {
    //   // 예외처리
    //   return;
    // }
    // if (currentPage % 10 === 0) {
    //   console.log('next안 현재페이지', currentPage)
    //   const changedStart = startPage + 10;
    //   const changedEnd = endPage + 10;
    //   dispatch(setStartEndPage(changedStart, changedEnd));
    // }
    dispatch(setCurrentPage(currentPage + 1, totalPage));
  };

  const handleFirstButton = () => dispatch(setCurrentPage(1, totalPage));
  const handleLastButton = () => dispatch(setCurrentPage(totalPage, totalPage));

  return (
    <div className="pageBtnContainer">
      <div className="pageBtn">
        <button className="prev" type="button" onClick={handleFirstButton}>
          <img
            id="firstBtn"
            className="prev"
            src="/icons/icon_arrow_double.svg"
            alt="go to first page"
          />
        </button>
      </div>
      <div className="pageBtn">
        <button className="prev" type="button" onClick={handlePrevButton}>
          <img src="/icons/icon_arrow_left.svg" alt="arrow" />
        </button>
      </div>
      {showButtons.map((v) => (
        <div key={v} className={v === currentPage ? 'selected' : 'none'}>
          <button
            className={v === currentPage ? 'currentPage' : 'pageNum'}
            type="button"
            value={v}
            onClick={handleClickPageNum}
          >
            {v}
          </button>
        </div>
      ))}
      <div className="pageBtn">
        <button className="next" type="button" onClick={handleNextButton}>
          <img src="/icons/icon_arrow_right.svg" alt="arrow" />
        </button>
      </div>
      <div className="pageBtn">
        <button className="next" type="button" onClick={handleLastButton}>
          <img
            id="lastBtn"
            className="next"
            src="/icons/icon_arrow_double.svg"
            alt="go to last page"
          />
        </button>
      </div>
    </div>
  );
}

export default SearchPageButtons;
