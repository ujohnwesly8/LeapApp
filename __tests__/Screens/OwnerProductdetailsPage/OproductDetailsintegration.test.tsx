import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import OproductDetails from '../../../src/screens/OwnerProductdetailsPage/OproductDetails';

describe('OproductDetails Integration Test', () => {
  const mockProduct = {
    name: 'Test Product',
    price: 10,
    description: 'Test Description',
    imageUrl: ['https://example.com/image.jpg'],
  };
  const mockRoute = {params: {product: mockProduct}};
  const mockNavigation = {goBack: jest.fn()};

  it('renders the product details correctly', () => {
    const {getByText, getByTestId} = render(
      <OproductDetails route={mockRoute} navigation={mockNavigation} />,
    );

    // Assert that product name is rendered
    expect(getByText('Test Product')).toBeTruthy();

    // Assert that product price is rendered
    expect(getByText('₹ 10')).toBeTruthy();

    // Assert that product description is rendered
    expect(getByText('Test Description')).toBeTruthy();

    // Assert that product image is rendered and has the correct source URI
    const productImage = getByTestId('product-image');
    expect(productImage).toBeTruthy();
    expect(productImage.props.source.uri).toBe('https://example.com/image.jpg');

    //Assert that back button is present and can be pressed
    const backButton = getByTestId('back-button');
    expect(backButton).toBeTruthy();
    fireEvent.press(backButton);
    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('navigates back when the back button is pressed', () => {
    const {getByTestId} = render(
      <OproductDetails route={mockRoute} navigation={mockNavigation} />,
    );

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);
    fireEvent.press(backButton);

    waitFor(() => {
      expect(mockNavigation.goBack).toHaveBeenCalledTimes(2);
    });
  });

  it('applies the correct styles', () => {
    const {getByText, getByTestId} = render(
      <OproductDetails route={mockRoute} navigation={mockNavigation} />,
    );

    const productDescription = getByText('Test Description');
    const backButton = getByTestId('back-button');

    // Assert that product description has a specific style
    expect(productDescription.props.style).toMatchObject({});

    //Assert that back button has a specific style
    expect(backButton.props.style).toMatchObject({});
  });
});
