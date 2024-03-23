import { Outlet } from 'react-router-dom';
import './App.scss';
import './styles/icon.scss';
import classNames from 'classnames';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const notification = useAppSelector(state => state.cart.notification);

  return (
    <div className="App">
      <Header />
      <main className="wrapper">
        <Outlet />
      </main>
      <Footer />
      <div className={classNames('notification', { visible: notification })}>
        Product added to cart
      </div>
    </div>
  );
};
