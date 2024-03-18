import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import './Nav.scss';

export const headerLinks = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About us',
    path: '/about-us',
  },
  {
    name: 'Store',
    path: '/store',
  },
  {
    name: 'Contact us',
    path: '/contact-us',
  },
];

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('nav__link', {
    'nav__link--active': isActive,
  });

const getIconClassCart = ({ isActive }: { isActive: boolean }) =>
  classNames('icon icon--cart', {
    'icon-cart--active': isActive,
  });

const getIconClassLogin = ({ isActive }: { isActive: boolean }) =>
  classNames('icon icon--login', {
    'icon-login--active': isActive,
  });

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          hP
        </Link>
        <nav className="header__nav nav">
          <ul className="nav__list">
            {headerLinks.map(({ name, path }) => (
              <li className="nav__item" key={name}>
                <NavLink className={getLinkClass} to={path}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__icons">
          <NavLink className={getIconClassCart} to="/cart" />
          <NavLink className={getIconClassLogin} to="/login" />
        </div>
      </div>
    </header>
  );
};
