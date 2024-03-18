/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import './Footer.scss';

export const footerLinks = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About us',
    path: '/about-us',
  },
  {
    name: 'Shop',
    path: '/shop',
  },
  {
    name: 'Contact us',
    path: '/contact-us',
  },
];

export const Footer = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/" className="footer__logo">
          hP
        </Link>
        <div className="footer__content">
          <div className="footer__left">
            <p className="footer__text">Please stay in touch with us:</p>
            <div className="footer__socials">
              <Link to="https://facebook.com" className="icon icon--facebook" />
              <Link
                to="https://instagram.com"
                className="icon icon--instagram"
              />
            </div>
          </div>
          <div className="footer__links">
            <a href="mailto:herbalpure@gmail.com" className="footer__link">
              herbalpure@gmail.com
            </a>
            <a href="tel:+380950950295" className="footer__link">
              +380 95 095 0295
            </a>
          </div>
        </div>
      </div>
      <p className="footer__copyright">
        @ 2024 Herbal Pure. All rights reserved.
      </p>
      <button type="button" className="footer__go-up" onClick={goToTop}>
        &#8593;
      </button>
    </footer>
  );
};
