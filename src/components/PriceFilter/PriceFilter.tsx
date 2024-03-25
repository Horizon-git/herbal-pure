/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchWith';
import './PriceFilter.scss';

interface PriceFilterProps {
  initialMinPrice?: number;
  initialMaxPrice?: number;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  initialMinPrice = 0,
  initialMaxPrice = 1000,
}) => {
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newMinPrice = searchParams.get('minPrice') || initialMinPrice.toString();
    const newMaxPrice = searchParams.get('maxPrice') || initialMaxPrice.toString();

    setMinPrice(+newMinPrice);
    setMaxPrice(+newMaxPrice);
  }, [initialMinPrice, initialMaxPrice, searchParams]);

  const updateUrl = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        minPrice: minPrice.toString() || null,
        maxPrice: maxPrice.toString() || null,
      }),
    );
  };

  const clearUrl = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        minPrice: null,
        maxPrice: null,
      }),
    );
  };

  return (
    <div className="price-filter">
      <Range
        step={0.1}
        min={initialMinPrice}
        max={initialMaxPrice}
        values={[minPrice, maxPrice]}
        onChange={([min, max]) => {
          setMinPrice(min);
          setMaxPrice(max);
        }}
        renderTrack={({ props, children }) => (
          <div 
            {...props} 
            className="price-filter__track"
            style={{
              background: getTrackBackground({
                values: [minPrice, maxPrice],
                colors: ['#f3f3f3', '#54bc59', '#f3f3f3'],
                min: initialMinPrice,
                max: initialMaxPrice,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => <div {...props} className="price-filter__thumb" />}
      />
      <div className="price-filter__container">
        <div className="price-filter__description">
          <p className="price-filter__text">
            Price range:
          </p>
          <p className="price-filter__text">
            {`$${minPrice} - $${maxPrice}`}
          </p>
        </div>
        <div className="price-filter__buttons">
          <button type="button" className="price-filter__button price-filter__button--red" onClick={clearUrl}>
            Clear filter
          </button>

          <button type="button" className="price-filter__button" onClick={updateUrl}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};
