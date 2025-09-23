import { Dialog, DialogActions, DialogContent } from '@mui/material';
import CustomButton from '../common/custom-button';
import useModal from '../../hooks/use-modal';

interface ModalProps {
  handleSave: () => void;
  loading: boolean;
  disabled: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  handleSave,
  loading,
  disabled,
  children,
}) => {
  const { isOpen, closeModal } = useModal();

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <CustomButton
          onClickFunc={closeModal}
          buttonText="Cancel"
          isLoading={loading}
        />
        <CustomButton
          buttonText="Save"
          onClickFunc={handleSave}
          isLoading={loading}
          disabled={disabled}
        />
      </DialogActions>
    </Dialog>
  );
};

Modal.propTypes = {};

export default Modal;
