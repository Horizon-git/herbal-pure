import { Outlet } from 'react-router-dom';
import './App.scss';
import './styles/icon.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App = () => (
  <div className="App">
    <Header />
    <div className="wrapper">
      <Outlet />
    </div>
    <Footer />
  </div>
);
