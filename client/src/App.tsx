import { Suspense } from 'react';
import AppRoutes from './routes';
import { CacheProvider } from '@emotion/react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';


const createEmotionCache = (direction: 'ltr' | 'rtl') =>
  createCache({
    key: direction === 'rtl' ? 'mui-rtl' : 'mui',
    stylisPlugins: direction === 'rtl' ? [rtlPlugin] : [],
  });


export default function App() {

  const { direction } = useSelector((state: RootState) => state.directions)
  const theme = createTheme({ direction })
  const cache = createEmotionCache(direction)

  return (
    <Suspense fallback={'Loading...'}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </CacheProvider>
    </Suspense>
  );
}
