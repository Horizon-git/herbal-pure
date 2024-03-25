/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import './CategoryWidget.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Category } from '../../types/Category';

interface Props {
  categories: Category[];
}

export const CategoryWidget: React.FC<Props> = ({ categories }) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const { categoryId = '' } = useParams();

  const handleCategoryClick = (clickId: string) => {
    if (expandedIds.includes(clickId)) {
      setExpandedIds(expandedIds.filter(id => id !== clickId));
    } else {
      setExpandedIds([...expandedIds, clickId]);
    }
  };

  return (
    <div className="widget">
      <h1 className="widget__title">Categories</h1>
      <ul className="widget__category-list">
        {categories.map(category => (
          <li key={category.id} className={`widget__category-item ${category.subcategories ? 'widget__category-item--has-subcategories' : ''}`}>
            <Link
              to={`/store/${category.id}`}
              className={classNames('widget__category-item__link',
                {'widget__category-item__link--active': category.id === categoryId})}
              onClick={e => {
                if (
                  category.subcategories && category.subcategories.length > 0
                ) {
                  e.preventDefault();
                  handleCategoryClick(category.id);
                }
              }}
            >
              {category.name}
            </Link>
            {category.subcategories && category.subcategories.length > 0 && (
              <TransitionGroup>
                {expandedIds.includes(category.id) && (
                  <CSSTransition
                    key="subcategories"
                    timeout={300}
                    classNames="widget__category-item__subcategories"
                    appear
                    enter
                  >
                    <ul className="widget__category-item__subcategories">
                      {category.subcategories.map(subcategory => (
                        <li className="widget__category-item" key={subcategory.id}>
                          <Link to={`/store/${subcategory.id}`} className={classNames('widget__category-item__link', {'widget__category-item__link--active': subcategory.id === categoryId})}>
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CSSTransition>
                )}
              </TransitionGroup>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
