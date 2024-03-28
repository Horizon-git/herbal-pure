import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import './App.scss';
import './styles/icon.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import { useAppDispatch } from './app/hooks';
import { checkAuthAsync } from './features/authSlice';

export const App = () => {
  const dispatch = useAppDispatch();
  // const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <main className="wrapper">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
