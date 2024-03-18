/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Search.scss';
import { getSearchWith } from '../../helpers/searchWith';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [newQuery, setNewQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams(
      getSearchWith(searchParams, {
        query: newQuery || null,
      }),
    );

    // setNewQuery('');
  };

  const reset = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: null,
      }),
    );
    setNewQuery('');
  };

  return (
    <form
      className="search"
      data-cy="search"
      onSubmit={event => handleSubmit(event)}
    >
      <input
        className="search__input"
        placeholder="Search"
        value={newQuery}
        onChange={event => setNewQuery(event.target.value)}
      />
      {newQuery !== '' && (
        <button
          type="button"
          className="search__button search__button--reset"
          onClick={reset}
        >
          <span className="icon icon--cancel" />
        </button>
      )}
      <button type="submit" className="search__button search__button--submit">
        <span className="icon icon--search" />
      </button>
    </form>
  );
};
