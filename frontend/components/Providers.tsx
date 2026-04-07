'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store, setAuth } from '@/lib/store';
import { theme } from '@/lib/theme';

interface ProvidersProps {
  children: React.ReactNode;
}

function AuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('nexusai_token');
    const userData = localStorage.getItem('nexusai_user');
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch(setAuth({ user, token }));
      } catch {
        localStorage.removeItem('nexusai_token');
        localStorage.removeItem('nexusai_user');
      }
    }
  }, [dispatch]);

  return null;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <AuthInit />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
