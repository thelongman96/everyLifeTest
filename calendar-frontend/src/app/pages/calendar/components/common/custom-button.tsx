import { Button } from '@mui/material';
import './styles/custom-button.scss';

const CustomButton = ({
  buttonText,
  onClickFunc,
  disabled = false,
  isLoading = false,
}: {
  buttonText: string;
  onClickFunc?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <div className="customButton__container">
      <Button
        className="customButton__button"
        onClick={onClickFunc}
        loading={isLoading}
        disabled={disabled}
        data-testid={`${buttonText}_btn`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default CustomButton;
