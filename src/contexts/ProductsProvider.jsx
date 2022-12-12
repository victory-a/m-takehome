import React from 'react';
import config from '../config';

const ProductsContext = React.createContext(undefined);

function ProductsProvider({ children }) {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch(`${config.API_BASE_URL}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data?.products))
      .catch(console.err);
  }, []);

  const value = { products, setProducts };

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
