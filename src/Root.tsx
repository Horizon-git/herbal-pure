/* eslint-disable max-len */
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { StorePage } from './pages/StorePage/StorePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './pages/CartPage/CartPage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        {/* <Route path="sign-up" element={<RegistrationPage />} />

        <Route path="login" element={<LoginPage />} /> */}
        <Route path="/store">
          <Route index element={<StorePage />} />
          <Route path=":categoryId" element={<StorePage />} />
        </Route>
        <Route path="/product">
          <Route index element={<h1>Not found</h1>} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
