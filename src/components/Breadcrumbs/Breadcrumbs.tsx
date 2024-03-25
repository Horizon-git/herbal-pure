import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Breadcrumbs.scss';

interface Props {
  links: { to: string; label: string | undefined }[];
}

export const Breadcrumbs: React.FC<Props> = ({ links }) => {
  return (
    <div className="breadcrumbs">
      {links.map(({ label, to }, index) => (
        <div key={to} className="breadcrumbs__part">
          {index > 0 && <span className="breadcrumbs__separator">/</span>}
          <Link
            to={to}
            className={classNames('breadcrumbs__link', {
              'breadcrumbs__link--active': links[links.length - 1].to === to,
            })}
          >
            {label}
          </Link>
        </div>
      ))}
    </div>
  );
};
