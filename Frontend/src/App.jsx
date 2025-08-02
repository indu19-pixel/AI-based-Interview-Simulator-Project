import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InterviewProvider } from './contexts/InterviewContext';
import theme from './styles/theme';
import GlobalStyles from './styles/globalStyles';
import HomePage from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <InterviewProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </InterviewProvider>
    </ThemeProvider>
  );
}

export default App;