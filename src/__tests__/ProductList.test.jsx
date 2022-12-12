import React from 'react';
import { render } from '@testing-library/react';
import ProductList from '../components/ProductsList/ProductList';

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
  it('❌ renders a the right amount of products specified', () => {
    const { getAllByTestId } = render(<ProductList products={[dummyProduct, { ...dummyProduct, id: 2 }]} />);

    expect(getAllByTestId('ProductCard')).toHaveLength(2);
  });
});
