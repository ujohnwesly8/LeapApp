import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native'; // Import NavigationContainer
import HeadingText from '../src/components/atoms/HeadingText/HeadingTest';

describe('HeadingText', () => {
  it('renders the message correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <HeadingText message="Hello World" />
      </NavigationContainer>,
    );
    const messageElement = getByText('Hello World');
    expect(messageElement).toBeDefined();
  });

  it('renders the text style correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <HeadingText message="Test" />
      </NavigationContainer>,
    );
    const textElement = getByText('Test');
    expect(textElement.props.style).toContainEqual({
      fontSize: 24,
      marginBottom: 10,
      fontFamily: 'Poppins-Bold',
    });
  });
});
