import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/SearchModal.scss';
import { useDispatch } from 'react-redux';
import {
  setSearchedProductList,
  setSearchedWord,
  setSearchType,
} from '../actions/searchAction';
import {
  searchHashtag,
  searchCategory,
  categoryForRequest,
} from '../assets/Search';

function SearchModal({ setOpenSearchModal, searchOrder, setQueryPage }) {
  const SearchModalCloseEl = useRef(null);
  const SearchModalCloseButtonEl = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const SearchModalCloseButton = (e) => {
    if (
      e.target === SearchModalCloseEl.current ||
      e.target === SearchModalCloseButtonEl.current
    ) {
      setOpenSearchModal(false);
    }
  };
  const handleKeywordBtn = (e) => {
    // 키즈,어린이만 type=search요청
    const idx = e.target.value - 1;
    const keyword = searchHashtag[idx].name.slice(2);
    if (idx === 6) {
      dispatch(setSearchedWord('키즈,어린이'));
      history.push({
        pathname: '/search',
        search: '?query=키즈,어린이&type=search',
      });
    } else {
      dispatch(setSearchedWord(keyword));
      history.push({
        pathname: '/search',
        search: `?query=${keyword}&type=keyword`,
      });
    }
    setOpenSearchModal(false);
  };

  const handleCategoryBtn = (categoryId) => {
    history.push({
      pathname: '/search',
      search: `?query=${categoryForRequest[categoryId]}&type=category`,
    });
    setOpenSearchModal(false);
  };
  return (
    <div className="SearchModal">
      <div className="SearchModal_container">
        <div className="SearchModal_in">
          <div className="SearchModal_keyword">
            <div>추천키워드</div>
            <div className="SearchModal_hashtage">
              {searchHashtag.map((keyword) => (
                <button
                  className="keyword"
                  type="button"
                  key={keyword.id}
                  value={keyword.id}
                  onClick={handleKeywordBtn}
                >
                  {keyword.name}
                </button>
              ))}
            </div>
          </div>
          <div className="SearchModal_category">
            <div>카테고리</div>
            <div className="SearchModal_category_icon">
              {searchCategory.map((category) => (
                <button
                  className="category"
                  type="button"
                  key={category.id}
                  onClick={() => handleCategoryBtn(category.id)}
                >
                  <img src={category.icon} alt={category.eng_name} />
                  <div>{category.kor_name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        onClick={(e) => {
          SearchModalCloseButton(e);
        }}
        ref={SearchModalCloseEl}
        className="SearchModal_close"
      >
        <button
          onClick={(e) => {
            SearchModalCloseButton(e);
          }}
          ref={SearchModalCloseButtonEl}
          type="button"
        >
          x
        </button>
      </div>
    </div>
  );
}

export default SearchModal;
