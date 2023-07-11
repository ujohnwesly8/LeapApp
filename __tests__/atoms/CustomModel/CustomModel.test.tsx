import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomModal from '../../../src/components/atoms/CustomModel/CustomModel';

describe('CustomModal', () => {
  const onCloseMock = jest.fn();
  const message = 'This is a test message';

  afterEach(() => {
    onCloseMock.mockClear();
  });

  it('renders modal with correct message when showModal is true', () => {
    const {getByText} = render(
      <CustomModal showModal={true} onClose={onCloseMock} message={message} />,
    );
    const messageElement = getByText(message);
    expect(messageElement).toBeDefined();
  });

  it('does not render modal when showModal is false', () => {
    const {queryByText} = render(
      <CustomModal showModal={false} onClose={onCloseMock} message={message} />,
    );
    const messageElement = queryByText(message);
    expect(messageElement).toBeNull();
  });

  it('calls onClose function when OK button is pressed', () => {
    const {getByText} = render(
      <CustomModal showModal={true} onClose={onCloseMock} message={message} />,
    );
    const okButton = getByText('OK');
    fireEvent.press(okButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
