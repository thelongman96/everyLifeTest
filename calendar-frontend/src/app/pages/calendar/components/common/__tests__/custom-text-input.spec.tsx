import { act, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomTextInput from '../custom-text-input';

const onChangeMock = jest.fn();
const onSubmitMock = jest.fn();

const defaultProps = {
  value: '',
  fieldId: 'test',
  fieldLabel: 'test',
  fieldType: '',
  fieldAutoComplete: '',
  fieldPlaceholder: '',
  errors: [],
  onChange: onChangeMock,
  onSubmit: onSubmitMock,
  fullWidth: false,
  customProps: {},
  sx: {},
};

const renderCustomTextInput = (props = defaultProps) => {
  return render(
    <CustomTextInput
      value={props.value}
      fieldId={props.fieldId}
      fieldLabel={props.fieldLabel}
      fieldType={props.fieldType}
      fieldAutoComplete={props.fieldAutoComplete}
      fieldPlaceholder={props.fieldPlaceholder}
      errors={props.errors}
      onChange={props.onChange}
      onSubmit={props.onSubmit}
      fullWidth={props.fullWidth}
      customProps={props.customProps}
      sx={props.sx}
    />,
  );
};

describe('CustomTextInputComponent', () => {
  it('renders correctly', () => {
    const { container } = renderCustomTextInput();

    expect(container).toMatchSnapshot();
  });

  describe('On Change - ', () => {
    it('should call onChange', async () => {
      renderCustomTextInput();

      const input = screen.getByTestId('test_input');
      await act(async () => {
        await fireEvent.change(input, { target: { value: 'test' } });
      });

      expect(onChangeMock).toHaveBeenCalled();
    });
  });
});
