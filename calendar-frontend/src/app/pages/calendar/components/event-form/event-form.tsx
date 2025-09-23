import { Box } from '@mui/material';
import CustomTextInput from '../common/custom-text-input';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import { EventFormProps } from '../../../../common/types';
import './styles/event-form.scss';

const EventForm: React.FC<EventFormProps> = ({
  formData,
  handleInputChange,
  errors,
  isEditing,
}) => {
  return (
    <Box>
      <h1>{isEditing ? 'Edit' : 'Add'} Event</h1>
      <CustomTextInput
        fullWidth
        fieldId="title"
        fieldLabel="Title"
        fieldType="text"
        value={formData.title}
        onChange={handleInputChange('title')}
        errors={errors.title ? [errors.title] : []}
        sx={{ mb: 3 }}
      />
      <div className="datePickerWrapper">
        <DateTimePicker
          label="Start Datetime"
          value={moment(formData.start)}
          onChange={(value) => {
            if (value) {
              handleInputChange('start')(value);
            }
          }}
        />
      </div>
      <div className="datePickerWrapper">
        <DateTimePicker
          label="End Datetime"
          value={moment(formData.end)}
          onChange={(value) => {
            if (value) {
              handleInputChange('end')(value);
            }
          }}
        />
      </div>
    </Box>
  );
};

export default EventForm;
