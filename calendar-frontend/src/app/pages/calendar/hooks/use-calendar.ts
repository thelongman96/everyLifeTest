import { useEffect, useState } from 'react';
import moment, { unitOfTime, Moment } from 'moment/moment';
import { View } from 'react-big-calendar';
import {
  AddEltEvent,
  EltEvent,
  FormData,
  FormErrors,
} from '../../../common/types';
import { CalendarService } from '../../../service/calendar.service';
import { filter } from 'lodash';
import { useEventStore } from '../../../stores/event-store';
import { useModalStore } from '../../../stores/modal-store';
import { toast } from 'react-toastify';

const useCalendar = () => {
  const calendarService = new CalendarService();
  const [events, setEvents] = useState<EltEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { selectedEvent, storeSelectedEvent } = useEventStore((state) => state);
  const { isOpen, toggleModal } = useModalStore((state) => state);

  // Event Form Modal Values
  const [formData, setFormData] = useState({
    title: '',
    start: moment(),
    end: moment(),
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (selectedEvent) {
      setIsEditing(true);
      setFormData({
        title: selectedEvent.title,
        start: moment(selectedEvent.start),
        end: moment(selectedEvent.end),
      });
    } else {
      setIsEditing(false);
      setFormData({
        title: '',
        start: moment().hour(12).minute(0),
        end: moment().hour(12).minute(30),
      });
    }
  }, [selectedEvent]);

  const fetchEvents = async (start: Moment, end: Moment) => {
    const { data } = await calendarService.getEventsForRange(start, end);
    const processedEvents: EltEvent[] = data.map((e) => ({
      id: e.id,
      title: e.name,
      start: new Date(e.start),
      end: new Date(e.end),
    }));
    setEvents(processedEvents);
  };

  useEffect(() => {
    const today = moment();
    fetchEvents(today.startOf('week'), today.clone().endOf('week'));
  }, []);

  const onNavigate = async (newDate: Date, view: View) => {
    const newMutableDate = moment(newDate);
    const unitOfTime = viewToUnitOfTime(view);
    await fetchEvents(
      newMutableDate.startOf(unitOfTime),
      newMutableDate.clone().endOf(unitOfTime),
    );
  };

  const addEvent = async (event: AddEltEvent) => {
    await calendarService
      .createEvent(formData.title, formData.start, formData.end)
      .then((resp) => {
        const {
          data: { id },
        } = resp;
        setEvents((events) => [...events, { ...event, id }]);
        toggleModal();
      })
      .catch(() => {
        toast.error('Error creating event. Try again later');
      });

    setIsLoading(false);
  };

  const updateEvent = async (event: EltEvent) => {
    setEvents((events: EltEvent[]) => {
      const filteredEvents = filter(events, (ev) => ev.id !== event.id);
      return [
        ...filteredEvents,
        {
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
        },
      ];
    });

    await calendarService
      .updateEvent(
        event.id,
        event.title,
        moment(event.start),
        moment(event.end),
      )
      .then(() => {
        storeSelectedEvent({ selectedEvent: event });
        if (isOpen) {
          toggleModal();
        }
      })
      .catch(() => {
        toast.error('Error updating event. Try again later');
        setEvents((events: EltEvent[]) => {
          const filteredEvents = filter(events, (ev) => ev.id !== event.id);
          return selectedEvent
            ? [...filteredEvents, selectedEvent]
            : filteredEvents;
        });
      });
    setIsLoading(false);
  };

  const viewToUnitOfTime = (view: View): unitOfTime.StartOf => {
    switch (view) {
      case 'day':
      case 'week':
      case 'month':
        return view;
      case 'agenda':
        return 'month';
      default:
        return 'week';
    }
  };

  type FormField = keyof FormData;

  const handleInputChange = (field: FormField) => (value: string | Moment) => {
    console.log(field, value)
    setFormData({
      ...formData,
      [field]: value,
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.title) {
      newErrors.title = 'Title is required';
      toast.error(newErrors.title);
    }

    if (!formData.start) {
      newErrors.start = 'Start date is required';
      toast.error(newErrors.start);
    }

    if (!formData.end) {
      newErrors.end = 'End date is required';
      toast.error(newErrors.end);
    }

    console.log(newErrors, formData);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    const event = {
      title: formData.title,
      start: formData.start.toDate(),
      end: formData.end.toDate(),
    };
    console.log(1, formData, event)
    if (validateForm()) {
      console.log(2)
      selectedEvent
        ? updateEvent({
            ...event,
            id: selectedEvent.id,
          })
        : addEvent(event);
    } else {
      console.log(3)
      setIsLoading(false);
    }
  };

  const disabled = selectedEvent
    ? formData.title === selectedEvent.title &&
      moment(formData.start).isSame(selectedEvent.start) &&
      moment(formData.end).isSame(selectedEvent.end)
    : formData.title === '';

  return {
    handleSaveClick,
    handleInputChange,
    formData,
    errors,
    events,
    onNavigate,
    addEvent,
    updateEvent,
    isLoading,
    disabled,
    isEditing,
  };
};

export default useCalendar;
