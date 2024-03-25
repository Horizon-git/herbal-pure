/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductList } from '../../components/ProductList/ProductList';
import { Search } from '../../components/Search/Search';
import './StorePage.scss';
import { Product } from '../../types/Product';
import { Pagination } from '../../components/Pagination/Pagination';
import { Sort } from '../../types/Sort';
import { getSearchWith } from '../../helpers/searchWith';
import { CategoryWidget } from '../../components/CategoryWidget/CategoryWidget';
import { DropDown } from '../../components/DropDown/DropDown';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts, fetchProductsByCategory } from '../../features/productsSlice';
import { fetchCategories } from '../../features/categoriesSlice';
import { findCategoryById } from '../../helpers/getCategoryName';
import { PriceFilter } from '../../components/PriceFilter/PriceFilter';
import { Loader } from '../../components/Loader/Loader';
import { Notification } from '../../components/Notification/Notification';

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
    label: 'Cheapest',
    value: 'price',
  },
];

const itemsPerPageOptions = [
  { label: '6', value: '6' },
  { label: '12', value: '12' },
];


export const StorePage = () => {
  const dispatch = useAppDispatch();
  const { products, loading, hasError } = useAppSelector(state => state.products);
  const { categories, loading: categoryLoading, hasError: categoryHasError } = useAppSelector((state) => state.categories);

  const { categoryId = '' } = useParams();

  const productsMaxPrice = products.reduce(
    (max: number, product: Product) => Math.max(max, product.price),
    0,
  ) || 10;

  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('show') || '6';
  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const getSort = searchParams.get('sort') || 'name';
  const [sortValue, setSortValue] = useState(getSort);
  const [showItems, setShowItems] = useState(perPage);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(+categoryId));
    } else {
      dispatch(fetchProducts());
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const indexOfLastItem = Math.min(currentPage * +perPage, products.length);
  const indexOfFirstItem = (currentPage - 1) * +perPage;

  const preparedProducts: Product[] = useMemo(() => {
    let sortedProducts;
    const normalizedQuery = query.toLocaleLowerCase();
    let filteredProducts = [...products];

    if (query) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(normalizedQuery),
      );
    }

    if (minPrice && maxPrice) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= +minPrice && product.price <= +maxPrice,
      );
    }

    switch (sortValue) {
      case Sort.alphabet:
        sortedProducts = [...filteredProducts].sort((p1, p2) =>
          p1[sortValue].localeCompare(p2[sortValue]),
        );
        break;
      case Sort.newest:
        sortedProducts = [...filteredProducts].sort(
          (p1, p2) => p2[sortValue] - p1[sortValue],
        );
        break;
      case Sort.cheapest:
        sortedProducts = [...filteredProducts].sort(
          (p1, p2) =>
            p1.price * ((100 - p1.discount) / 100)
            - p2.price * ((100 - p2.discount) / 100),
        );
        break;

      default:
        return filteredProducts;
    }

    return sortedProducts || filteredProducts;
  }, [query, minPrice, maxPrice, sortValue, products]);

  const currentProducts = useMemo(() => {
    return perPage !== 'all'
      ? preparedProducts.slice(indexOfFirstItem, indexOfLastItem)
      : [...preparedProducts];
  }, [preparedProducts, perPage, indexOfFirstItem, indexOfLastItem]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortValue = event.target.value;

    setSortValue(newSortValue);

    setSearchParams(getSearchWith(searchParams, {
      sort: newSortValue,
    }));
  };

  const handleShowChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newShowValue = event.target.value;

    setShowItems(newShowValue);

    setSearchParams(getSearchWith(searchParams, {
      show: newShowValue,
    }));
  };

  const linksObj1 = [
    { to: '/', label: 'Home' },
    { to: '/store', label: 'Store' },
  ];
  
  const linksObj2 = [
    { to: '/', label: 'Home' },
    { to: '/store', label: 'Store' },
    { to: `/store/${categoryId}`, label: findCategoryById(+categoryId, categories)?.name },
  ];

  if (loading || categoryLoading) {
    return (
      <div className="store__container">
        <Loader />
      </div>
    );
  }

  if (hasError || categoryHasError) {
    return (
      <div className="store__container">
        <Notification message="Server error, please try to reload page" />
      </div>
    );
  }

  return (
    <div className="store">
      <div className="store__container">
        {categoryId ? <Breadcrumbs links={linksObj2} /> : <Breadcrumbs links={linksObj1} />}
        <h1 className="store__title">{categoryId ? findCategoryById(+categoryId, categories)?.name :'All products'}</h1>
        <div className="store__content">
          <aside className="store__sidebar">
            <Search />
            {categoryLoading ? <Loader /> : <CategoryWidget  categories={categories}/>}
            <PriceFilter 
              initialMinPrice={0} 
              initialMaxPrice={productsMaxPrice} 
            />
          </aside>
          {loading ? (<Loader />) : (
            <div className="store__main">
              <div className="store__sort-bar">
                <span className="store__product-count">
                  {`${preparedProducts.length} results`} {(currentProducts.length !== preparedProducts.length) 
                          && currentPage && `(showing ${indexOfFirstItem + 1} - ${indexOfLastItem})`}
                </span>
                <div className="store__dropdowns">
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
              <div className="store__products">
                {preparedProducts.length === 0
                  ? 'Sorry, we don\'t have  any products that match your search.'
                  : <ProductList products={currentProducts} />
                }
              </div>
              {(currentProducts.length !== preparedProducts.length) 
                          && currentPage && (
                <Pagination total={preparedProducts.length} />
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
