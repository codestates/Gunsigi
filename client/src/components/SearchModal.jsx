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
  const dispatch = useDispatch();
  const history = useHistory();
  const SearchModalCloseButton = (e) => {
    if (e.target === SearchModalCloseEl.current) {
      setOpenSearchModal(false);
    }
  };
  const handleTagBtn = (e) => {
    // 키즈 어린이만 type=search요청
    const idx = e.target.value - 1;
    const tag = searchHashtag[idx].name.slice(2);
    setQueryPage(1);
    if (idx === 6) {
      axios
        .get('/products', {
          params: {
            query: '키즈,어린이',
            type: 'search',
            order: searchOrder,
          },
        })
        .then((res) => {
          const { items, pages } = res.data;
          dispatch(setSearchedProductList(items, pages.itemCount));
          dispatch(setSearchType('search'));
          dispatch(setSearchedWord('키즈,어린이'));
        });
    } else {
      axios
        .get('/products', {
          params: {
            query: tag,
            type: 'keyword',
            order: searchOrder,
          },
        })
        .then((res) => {
          const { items, pages } = res.data;
          dispatch(setSearchedProductList(items, pages.itemCount));
          dispatch(setSearchType('keyword'));
          dispatch(setSearchedWord(tag));
        });
    }
    setOpenSearchModal(false);
    history.push({
      pathname: '/search',
      state: { queryPage: 2 },
    });
    window.scrollTo(0, 0);
  };

  const handleCategoryBtn = (categoryId) => {
    setQueryPage(1);
    axios
      .get('/products', {
        params: {
          query: categoryForRequest[categoryId],
          type: 'category',
          order: searchOrder,
        },
      })
      .then((res) => {
        const { items, pages } = res.data;
        dispatch(setSearchedProductList(items, pages.itemCount));
        dispatch(setSearchedWord(categoryForRequest[categoryId]));
        dispatch(setSearchType('category'));
        setOpenSearchModal(false);
        history.push({
          pathname: '/search',
          state: { queryPage: 2 },
        });
        window.scrollTo(0, 0);
      });
  };
  return (
    <div className="SearchModal">
      <div className="SearchModal_container">
        <div className="SearchModal_in">
          <div className="SearchModal_keyword">
            <div>추천키워드</div>
            <div className="SearchModal_hashtage">
              {searchHashtag.map((tag) => (
                <button
                  className="tag"
                  type="button"
                  key={tag.id}
                  value={tag.id}
                  onClick={handleTagBtn}
                >
                  {tag.name}
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
      <div className="SearchModal_close">
        <button
          onClick={(e) => {
            SearchModalCloseButton(e);
          }}
          ref={SearchModalCloseEl}
          type="button"
        >
          x
        </button>
      </div>
    </div>
  );
}

export default SearchModal;
