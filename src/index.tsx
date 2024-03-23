import { createRoot } from 'react-dom/client';

// import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.scss';

import { Provider } from 'react-redux';
import { store } from './app/store';
import { Root } from './Root';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
