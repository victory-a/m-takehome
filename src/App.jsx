import React from 'react';
import styles from './app.module.scss';
import SelectInput from './components/FormElelments/SelectInput';
import TextInput from './components/FormElelments/Textinput';
import ProductList from './components/ProductsList/ProductList.jsx';
import { useProducts, fieldTypes } from './contexts/ProductsProvider';

function App() {
  const { products, categories, search, setSearch, loading, addFilter } = useProducts();
  const [selectedCategory, setSelectedCategory] = React.useState('');

  function handleSelect(e) {
    setSelectedCategory(e.target.value);
    addFilter(fieldTypes.categories, e.target.value);
  }

  return (
    <div className={styles.app}>
      <h1>Products Catalogue</h1>

      <div className={styles.filters}>
        <TextInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search for products' />
        <SelectInput value={selectedCategory} onChange={handleSelect} options={categories} name='filter' />
      </div>

      {loading ? <p>fetching products ...</p> : <ProductList products={products} />}
    </div>
  );
}

export default App;
