import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SplashScreen from '../src/screens/Splashscreen/Splashscreen';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock ColorSchemeContext
// const mockColorSchemeContext = {
//   colorScheme: 'light',
// };
// jest.mock('../../../ColorSchemeContext', () => ({
//   ColorSchemeContext: {
//     useContext: jest.fn().mockReturnValue(mockColorSchemeContext),
//   },
// }));

describe('SplashScreen', () => {
  it('should render and match snapshot', () => {
    const {toJSON} = render(<SplashScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate to Login screen when Get Started button is pressed', () => {
    const {getByTestId} = render(<SplashScreen />);
    const getStartedButton = getByTestId('get-started-button');
    fireEvent.press(getStartedButton);
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});
