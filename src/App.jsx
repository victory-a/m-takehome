import React from 'react';
import styles from './app.module.scss';
import Button from './components/FormElelments/Button';
import SelectInput from './components/FormElelments/SelectInput';
import TextInput from './components/FormElelments/Textinput';
import ProductList from './components/ProductsList/ProductList.jsx';
import { useProducts, fieldTypes, sortOptions } from './contexts/ProductsProvider';

function App() {
  const { products, categories, search, setSearch, loading, addFilter, resetFilters } = useProducts();
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [sortBy, setSortBy] = React.useState('');

  function handleSelect(e) {
    setSelectedCategory(e.target.value);
    addFilter(fieldTypes.categories, e.target.value);
  }

  function handleSortByPrice(e) {
    setSortBy(e.target.value);
    addFilter(fieldTypes.price, e.target.value);
  }

  function handleReset() {
    resetFilters();
    setSelectedCategory('');
    setSortBy('');
  }

  return (
    <div className={styles.app}>
      <h1>Products Catalogue</h1>

      <div className={styles.filters}>
        <TextInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search for products' />
        <SelectInput value={selectedCategory} onChange={handleSelect} options={categories} name='filterByType' defaultOption='all' />
        <SelectInput value={sortBy} onChange={handleSortByPrice} options={Object.keys(sortOptions)} name='filterByPrice' defaultOption='none' />
        <Button onClick={handleReset}>Reset Filters</Button>
      </div>

      {loading ? <p>fetching products ...</p> : <ProductList products={products} />}
    </div>
  );
}

export default App;
