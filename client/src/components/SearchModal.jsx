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

function SearchModal({ setOpenSearchModal }) {
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

    if (idx === 6) {
      axios
        .get('/products', {
          params: {
            query: '키즈,어린이',
            type: 'search',
            order: 'views',
          },
        })
        .then((res) => {
          const { items, pages } = res.data;
          dispatch(setSearchedProductList(items, pages.itemCount));
          dispatch(setSearchType('search'));
          dispatch(setSearchedWord('키즈,어린이'));
          setOpenSearchModal(false);
          history.push('/search');
          window.scrollTo(0, 0);
        });
    } else {
      axios
        .get('/products', {
          params: {
            query: tag,
            type: 'keyword',
            order: 'views',
          },
        })
        .then((res) => {
          const { items, pages } = res.data;
          dispatch(setSearchedProductList(items, pages.itemCount));
          dispatch(setSearchType('keyword'));
          dispatch(setSearchedWord(tag));
          setOpenSearchModal(false);
          history.push('/search');
          window.scrollTo(0, 0);
        });
    }
  };
  const handleCategoryBtn = (categoryId) => {
    // 아이디 따라 해당 카테고리로 서버요청,
    // 성공시, 모달닫고
    // 결과리스트를 서치페이지로 이동해서 보여줌
    axios
      .get('/products', {
        params: {
          query: categoryForRequest[categoryId],
          type: 'category',
          order: 'views',
        },
      })
      .then((res) => {
        const { items, pages } = res.data;
        dispatch(setSearchedProductList(items, pages.itemCount));
        dispatch(setSearchedWord(categoryForRequest[categoryId]));
        dispatch(setSearchType('category'));
        setOpenSearchModal(false);
        history.push('/search');
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
