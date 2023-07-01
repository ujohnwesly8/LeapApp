import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import SwitchAccountButton from '../../../src/components/atoms/SwtichAccountButton';

jest.mock('axios');

describe('SwitchAccountButton', () => {
  const mockStore = configureStore([]);
  const initialState = {
    Rolereducer: {
      role: 'OWNER',
    },
  };
  let store;
  let component;

  beforeEach(() => {
    store = mockStore(initialState);
    component = (
      <Provider store={store}>
        <SwitchAccountButton />
      </Provider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the button correctly', () => {
    const {getByTestId} = render(component);
    const button = getByTestId('switch-account-button');
    expect(button).toBeDefined();
  });

  it('toggles the options when the button is pressed', () => {
    const {getByTestId, queryByText} = render(component);
    const button = getByTestId('switch-account-button');
    fireEvent.press(button);
    expect(queryByText('Borrower')).toBeDefined();
    expect(queryByText('Owner')).toBeDefined();
  });

  it('dispatches the setRole action when an option is selected', async () => {
    const {getByTestId, getByText} = render(component);
    const button = getByTestId('switch-account-button');
    fireEvent.press(button);
    const borrowerOption = getByText('Borrower');
    axios.post.mockResolvedValueOnce({status: 200});
    fireEvent.press(borrowerOption);
    const actions = store.getActions();
    expect(actions[0].type).toEqual('SET_ROLE');
    expect(actions[0].payload).toEqual('BORROWER');
  });
});
