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

export const sortOptions = { ascending: 'ascending', descending: 'descending' };
export const fieldTypes = { categories: 'categories', price: 'price' };

const defaultFilterState = { categories: undefined, price: undefined };

function ProductsProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState('');
  const [filters, setFilters] = React.useState({});

  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);

    fetch(`${config.API_BASE_URL}/products`)
      .then((response) => response.json())
      .then((data) => {
        setData(data?.products);
        setCategories(() => stripCategories(data?.products));
      })
      .catch(console.err)
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    filterData();
  }, [search, data, filters]);

  const filterData = () => {
    let filteredData = [...data];

    const fields = Object.keys(filters);
    for (const field of fields) {
      switch (field) {
        case fieldTypes.categories: {
          const value = filters[field];

          if (value) {
            filteredData = filteredData.filter((product) => value === product.category);
          } else if (value === false) {
            filteredData = filteredData.filter((product) => !value === product.category);
          }
          break;
        }

        case fieldTypes.price: {
          const value = filters[field];
          if (value === sortOptions.ascending) {
            filteredData = filteredData.sort((a, b) => Number(a.price) - Number(b.price));
          } else if (value === sortOptions.descending) {
            filteredData = filteredData.sort((a, b) => Number(b.price) - Number(a.price));
          }
        }

        default:
          break;
      }
    }

    if (search) {
      filteredData = filteredData.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    }

    setProducts(filteredData);
  };

  function addFilter(field, value) {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  }

  function removeFilter(field) {
    const newFilters = { ...filters };
    newFilters[field] = undefined;
    setFilters(newFilters);
  }

  const resetFilters = () => {
    setFilters(defaultFilterState);
  };

  const value = { products, categories, search, loading, setSearch, addFilter, removeFilter, resetFilters };

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
