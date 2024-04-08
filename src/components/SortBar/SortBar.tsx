/* eslint-disable prettier/prettier */
import React from 'react';
import { DropDown } from '../DropDown/DropDown';
import './SortBar.scss';

const sortOptions = [
  {
    label: 'Alphabetically',
    value: 'name',
  },
  {
    label: 'Newest',
    value: 'id',
  },
  {
    label: 'Price: from low to high',
    value: 'lowest-price',
  },
  {
    label: 'Price: from high to low',
    value: 'highest-price',
  },
];

const itemsPerPageOptions = [
  { label: '6', value: '6' },
  { label: '12', value: '12' },
];

interface SortBarProps {
  sortValue: string;
  showItems: string;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleShowChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  preparedProductsLength: number;
  currentProductsLength: number;
  currentPage: number;
  indexOfFirstItem: number;
  indexOfLastItem: number;
}

export const SortBar: React.FC<SortBarProps> = React.memo(({
  sortValue,
  showItems,
  handleSortChange,
  handleShowChange,
  preparedProductsLength,
  currentProductsLength,
  currentPage,
  indexOfFirstItem,
  indexOfLastItem,
}) => {
  return (
    <div className="sort-bar">
      <span className="sort-bar__product-count">
        {`${preparedProductsLength} results`}{' '}
        {currentProductsLength !== preparedProductsLength
          && currentPage
          && `(showing ${indexOfFirstItem + 1} - ${indexOfLastItem})`}
      </span>
      <div className="sort-bar__dropdowns">
        <DropDown
          label="Sort by"
          name="sort"
          value={sortValue}
          options={sortOptions}
          onChange={handleSortChange}
        />
        <DropDown
          label="Show"
          name="show"
          value={showItems}
          options={itemsPerPageOptions}
          onChange={handleShowChange}
        />
      </div>
    </div>
  );
});
