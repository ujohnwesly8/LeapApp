import React from 'react';
import {render} from '@testing-library/react-native';
import OproductDetails from '../../../src/screens/OwnerProductdetailsPage/OproductDetails';
describe('OproductDetails', () => {
  const mockProduct = {
    name: 'Test Product',
    price: 10,
    description: 'Test Description',
    imageUrl: ['https://example.com/image.jpg'],
  };
  const mockRoute = {params: {product: mockProduct}};
  const mockNavigation = {goBack: jest.fn()};

  it('renders the product details correctly', () => {
    const {getByText} = render(
      <OproductDetails route={mockRoute} navigation={mockNavigation} />,
    );

    // Assert that the product name is rendered
    expect(getByText('Test Product')).toBeTruthy();

    // Assert that the product price is rendered
    expect(getByText('₹ 10')).toBeTruthy();

    // Assert that the product description is rendered
    expect(getByText('Test Description')).toBeTruthy();
  });
});
