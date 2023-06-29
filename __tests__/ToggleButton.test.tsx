import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ColorSchemeContext} from '../ColorSchemeContext';
import Togglebutton from '../src/components/atoms/Colorscheme/Togglebutton';

describe('ToggleButton', () => {
  it('should toggle the color scheme when the switch is pressed', () => {
    const toggleColorScheme = jest.fn();
    const colorScheme = 'dark';

    const {getByTestId} = render(
      <ColorSchemeContext.Provider value={{colorScheme, toggleColorScheme}}>
        <Togglebutton />
      </ColorSchemeContext.Provider>,
    );

    const toggleSwitch = getByTestId('toggle-switch');

    fireEvent(toggleSwitch, 'valueChange');

    expect(toggleColorScheme).toHaveBeenCalledTimes(1);
  });

  it('should render the switch with the correct properties based on the color scheme', () => {
    const colorScheme = 'dark';

    const {getByTestId} = render(
      <ColorSchemeContext.Provider
        value={{colorScheme, toggleColorScheme: jest.fn()}}>
        <Togglebutton />
      </ColorSchemeContext.Provider>,
    );

    const toggleSwitch = getByTestId('toggle-switch');

    expect(toggleSwitch.props.value).toBe(true);
    expect(toggleSwitch.props.trackColor).toEqual({
      false: '#767577',
      true: '#81b0ff',
    });
    expect(toggleSwitch.props.thumbColor).toBe('#f5dd4b');
    expect(toggleSwitch.props.ios_backgroundColor).toBe('#3e3e3e');
  });
});
