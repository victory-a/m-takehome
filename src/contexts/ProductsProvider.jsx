import React from 'react';
import config from '../config';

const ProductsContext = React.createContext(undefined);

function ProductsProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);

    fetch(`${config.API_BASE_URL}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data?.products))
      .catch(console.err)
      .finally(() => setLoading(false));
  }, []);

  const value = { products, loading };

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
