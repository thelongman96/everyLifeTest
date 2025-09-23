import { Moment } from 'moment';
import { Event } from 'react-big-calendar';

export interface EltEvent extends Event {
  title: string;
  id: number;
}

export interface AddEltEvent extends Event {
  title: string;
}

export interface EventFormProps {
  formData: {
    title: string;
    start: string | Moment;
    end: string | Moment;
  };
  handleInputChange: (
    field: keyof FormData,
  ) => (value: string | Moment) => void;
  errors: {
    title?: string;
    start?: string;
    end?: string;
    [key: string]: string | undefined;
  };
  isEditing?: boolean;
}

export interface FormData {
  title: string;
  start: Moment;
  end: Moment;
}

export interface FormErrors {
  title?: string;
  start?: string;
  end?: string;
  [key: string]: string | undefined;
}
