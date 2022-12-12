import React from 'react';
import config from '../config';

const ProductsContext = React.createContext(undefined);
// populate categories dynamically
function stripCategories(products) {
  let categories = [];

  if (!products.length) return categories;

  const store = new Set(); //set is preferred here to avoid duplicates
  products.forEach((product) => product.category && store.add(product.category));
  categories = Array.from(store);
  return categories;
}

function ProductsProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState('');

  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);

    fetch(`${config.API_BASE_URL}/products`)
      .then((response) => response.json())
      .then((data) => setData(data?.products))
      .catch(console.err)
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    filterData();
  }, [search, data]);

  const filterData = () => {
    let filteredData = [...data];

    if (search) {
      filteredData = filteredData.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    }

    setProducts(filteredData);
    setCategories(() => stripCategories(filteredData));
  };

  const value = { products, categories, loading, setSearch };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export default ProductsProvider;

export const useProducts = () => {
  const context = React.useContext(ProductsContext);

  if (!context) {
    throw Error('Cannot use `useProducts` outside of `ProductsProvider`');
  }

  return context;
};
