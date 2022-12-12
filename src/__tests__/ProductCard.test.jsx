import React from 'react';
import { render, within } from '@testing-library/react';
import ProductCard from '../components/ProductCard/ProductCard';
import { formatCurrency } from '../utils/helpers';

const dummyProduct = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
};

describe('ProductList Component', () => {
  it('❌ renders a product card with an image, title, price and rating', () => {
    const { getByText, getByRole } = render(<ProductCard product={dummyProduct} />);

    expect(getByText(dummyProduct.title)).toBeInTheDocument();
    expect(getByText(`Price: ${formatCurrency(dummyProduct.price)}`)).toBeInTheDocument();
    expect(getByText(`Rating: ${dummyProduct.rating}`)).toBeInTheDocument();
    expect(getByRole('productImage')).toHaveStyle(`background-image: url(${dummyProduct.thumbnail})`);
  });
});
