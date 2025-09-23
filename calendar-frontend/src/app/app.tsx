import styled from '@emotion/styled';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { Route, Routes } from 'react-router-dom';
import { CalendarPage } from './pages/calendar/calendar.page';
import { ToastContainer } from 'react-toastify';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
        </Routes>
        <ToastContainer />
      </LocalizationProvider>
    </StyledApp>
  );
}

export default App;
