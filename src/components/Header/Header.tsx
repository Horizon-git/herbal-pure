import classNames from 'classnames';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import './Nav.scss';
import '../../styles/logo.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTotalCount } from '../../helpers/getTotalCount';
import { logout } from '../../features/authSlice';

export const headerLinks = [
  {
    name: 'Home',
    path: '/',
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

export const Header = () => {
  const cart = useAppSelector(state => state.cart.cart);
  const { user, isChecked } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const toLogin = () => {
    navigate('/login');
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src="logo.png" alt="logo" className="logo" />
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
          {!user && isChecked && (
            <button
              type="button"
              className="login-button"
              onClick={() => toLogin()}
            >
              Login
            </button>
          )}
          {user && isChecked && (
            <button
              type="button"
              className="login-button"
              onClick={() => logoutHandler()}
            >
              Logout
            </button>
          )}
          <NavLink className={getIconClassCart} to="/cart">
            {cart.length > 0 && (
              <span className="header__counter">{getTotalCount(cart)}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
