import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './productsList.module.scss';

const ProductList = ({ products }) => {
  if (!products) return null;

  return (
    <section className={styles.container}>
      <ul>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
