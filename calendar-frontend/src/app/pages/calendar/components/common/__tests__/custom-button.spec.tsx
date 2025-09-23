import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CustomButton from '../custom-button';

const onClickFuncMock = jest.fn();

const defaultProps = {
  buttonText: 'test',
  onClickFunc: onClickFuncMock,
  disabled: false,
  isLoading: false,
};

const renderCustomButton = (props = defaultProps) => {
  return render(
    <CustomButton
      buttonText={props.buttonText}
      onClickFunc={props.onClickFunc}
      disabled={props.disabled}
      isLoading={props.isLoading}
    />,
  );
};

describe('CustomButtonComponent', () => {
  it('renders correctly', () => {
    const { container } = renderCustomButton();

    expect(container).toMatchSnapshot();
  });

  describe('On Click - Calls onClickFunc', () => {
    it('should ', async () => {
      renderCustomButton();

      const btn = screen.getByTestId('test_btn');
      userEvent.click(btn);

      expect(onClickFuncMock).toHaveBeenCalled();
    });
  });

  describe('Button disabled when disabled prop is true', () => {
    it('should ', async () => {
      renderCustomButton({ ...defaultProps, disabled: true });

      const btn = screen.getByTestId('test_btn');

      expect(btn).toBeDisabled();
    });
  });
});
