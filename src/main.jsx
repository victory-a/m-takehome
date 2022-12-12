import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ProductsProvider, { useProducts } from './contexts/ProductsProvider';

import './sass/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>
);
