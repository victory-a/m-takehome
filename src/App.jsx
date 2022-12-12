import React from 'react';
import styles from './app.module.scss';
import TextInput from './components/FormElelments/Textinput';
import ProductList from './components/ProductsList/ProductList.jsx';
import { useProducts } from './contexts/ProductsProvider';

function App() {
  const { products, setSearch, loading } = useProducts();

  return (
    <div className={styles.app}>
      <h1>Products Catalogue</h1>

      <div className={styles.search}>
        <TextInput onChange={(e) => setSearch(e.target.value)} placeholder='Type to search products by name' />
      </div>

      {loading ? <p>fetching products ...</p> : <ProductList products={products} />}
    </div>
  );
}

export default App;
