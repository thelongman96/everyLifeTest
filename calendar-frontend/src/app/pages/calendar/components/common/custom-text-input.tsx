import { TextField, type InputBaseComponentProps } from '@mui/material';
import './styles/custom-text-input.scss';

const CustomTextInput = ({
  value,
  fieldId,
  fieldLabel,
  fieldType,
  fieldAutoComplete,
  fieldPlaceholder,
  errors,
  onChange,
  onSubmit,
  fullWidth = false,
  customProps,
  sx,
}: {
  value?: string | null;
  fieldId: string;
  fieldLabel?: string;
  fieldType?: string;
  fieldAutoComplete?: string;
  fieldPlaceholder?: string;
  errors?: Array<string>;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  fullWidth?: boolean;
  customProps?: InputBaseComponentProps;
  sx?: object;
}) => {
  const errorsArray = errors ?? [];
  const onKeyUp = (e: { key: string }) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="customTextInput__container">
      <TextField
        fullWidth={fullWidth}
        value={value}
        id={fieldId}
        name={fieldId}
        variant="outlined"
        label={fieldLabel}
        {...(fieldType && { type: fieldType })}
        {...(fieldAutoComplete && {
          autoComplete: fieldAutoComplete,
        })}
        placeholder={fieldPlaceholder}
        error={errorsArray.length > 0}
        onChange={(e) => {
          if (onChange) {
            console.log('calling');
          }
        }}
        onKeyUp={onKeyUp}
        inputProps={customProps}
        sx={sx}
        helperText={errorsArray.length > 0 ? errorsArray[0] : ''}
        slotProps={{
          htmlInput: {
            'data-testid': `${fieldId}_input`,
          },
        }}
      />
    </div>
  );
};

export default CustomTextInput;
