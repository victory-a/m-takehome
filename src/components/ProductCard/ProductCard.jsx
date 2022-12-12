import React from 'react';
import styles from './productsCard.module.scss';
import { formatCurrency } from '../../utils/helpers';

const ProductCard = ({ product }) => {
  return (
    <article className={styles.container} data-testid="ProductCard">
      <div className={styles.image} style={{ backgroundImage: `url(${product.thumbnail})` }} role="productImage"></div>
      <h2>{product.title}</h2>
      <p>
        {`Price: ${formatCurrency(product.price)}`} <span>{`(-${product.discountPercentage}%)`}</span>
      </p>
      <p>Rating: {product.rating}</p>
    </article>
  );
};

export default ProductCard;
