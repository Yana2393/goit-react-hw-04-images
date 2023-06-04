import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { MdSearch } from 'react-icons/md';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!search.trim()) {
      return alert('Enter text');
    }
    onSubmit(search);
  };

  return (
    <div className={css.searchbarWrap}>
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={e => handleSubmit(e)}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>
              <MdSearch />
            </span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={e => handleChange(e)}
          />
        </form>
      </header>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
