import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Styles from '../src/constants/themeColors';
import {ColorSchemeProvider, ColorSchemeContext} from '../ColorSchemeContext';
import {View} from 'react-native';

describe('ColorSchemeContext', () => {
  it('should toggle the color scheme when the toggleColorScheme function is called', () => {
    const {getByTestId} = render(
      <ColorSchemeProvider>
        <ColorSchemeContext.Consumer>
          {({colorScheme, toggleColorScheme}) => (
            <button onPress={toggleColorScheme} testID="toggle-button">
              {colorScheme}
            </button>
          )}
        </ColorSchemeContext.Consumer>
      </ColorSchemeProvider>,
    );

    const toggleButton = getByTestId('toggle-button');
    fireEvent.press(toggleButton);

    expect(toggleButton.props.children).toBe('light');
  });

  it('should return the correct container style based on the color scheme', () => {
    const {getByTestId} = render(
      <ColorSchemeProvider>
        <ColorSchemeContext.Consumer>
          {({getContainerStyle}) => (
            <View style={getContainerStyle()} testID="container" />
          )}
        </ColorSchemeContext.Consumer>
      </ColorSchemeProvider>,
    );

    const container = getByTestId('container');
    expect(container.props.style).toEqual(Styles.blacktheme);

    fireEvent.press(getByTestId('toggle-button'));

    expect(container.props.style).toEqual(Styles.whiteTheme);
  });

  // Add more test cases for other functions in the ColorSchemeContext
});
