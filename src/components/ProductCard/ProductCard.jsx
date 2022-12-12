import React from 'react';
import styles from './productsCard.module.scss';
import { formatCurrency } from '../../utils/helpers';

const ProductCard = ({ product }) => {
  return (
    <article className={styles.container}>
      <h2>{product.title}</h2>
      <p>
        {`Price: ${formatCurrency(product.price)}`} <span>{`(-${product.discountPercentage}%)`}</span>
      </p>
      <p>Rating: {product.rating}</p>
    </article>
  );
};

export default ProductCard;