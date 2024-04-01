/* eslint-disable max-len */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { StorePage } from './pages/StorePage/StorePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './pages/CartPage/CartPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage/OrderSuccessPage';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { ContactUsPage } from './pages/ContactUsPage/ContactUsPage';
import { PageNotFoundPage } from './pages/PageNotFoundPage/PageNotFoundPage';

export const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="sign-up" element={<RegistrationPage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="/store">
          <Route index element={<StorePage />} />
          <Route path=":categoryId" element={<StorePage />} />
        </Route>
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route
          path="/order/:orderId"
          element={
            <RequireAuth>
              <OrderSuccessPage />
            </RequireAuth>
          }
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />

        <Route path="*" element={<PageNotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
