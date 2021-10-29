import React, { useRef } from 'react';
import '../styles/SearchModal.scss';
import { searchHashtag, searchCategory } from '../assets/Search';

function SearchModal({ setOpenSearchModal }) {
  const SearchModalCloseEl = useRef(null);

  const SearchModalCloseButton = (e) => {
    if (e.target === SearchModalCloseEl.current) {
      setOpenSearchModal(false);
    }
  };
  return (
    <div className="SearchModal">
      <div className="SearchModal_container">
        <div className="SearchModal_in">
          <div className="SearchModal_keyword">
            <div>추천키워드</div>
            <div className="SearchModal_hashtage">
              {searchHashtag.map((tag) => (
                <span key={tag.id}>{tag.name}</span>
              ))}
            </div>
          </div>
          <div className="SearchModal_category">
            <div>카테고리</div>
            <div className="SearchModal_category_icon">
              {searchCategory.map((category) => (
                <span key={category.id}>
                  <img src={category.icon} alt={category.eng_name} />
                  <div>{category.kor_name}</div>
                </span>
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
