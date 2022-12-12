import React from 'react';
import styles from './app.module.scss';
import ProductList from './components/ProductsList/ProductList.jsx';
import { useProducts } from './contexts/ProductsProvider';

function App() {
  const { products } = useProducts();

  return (
    <div className={styles.app}>
      <h1>Products Catalogue</h1>
      <ProductList products={products} />
    </div>
  );
}

export default App;
