/* eslint-disable max-len */
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { StorePage } from './pages/StorePage/StorePage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/store">
          <Route index element={<StorePage />} />
          <Route path=":categoryId" element={<StorePage />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);
