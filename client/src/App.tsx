import { Suspense } from 'react';
import AppRoutes from './routes';
import { Box } from '@mui/material';

export default function App() {
  return (
    <Suspense fallback={'Loading...'}>
      <Box sx={{ direction: 'rtl' }}>
        <AppRoutes />
      </Box>
    </Suspense>
  );
}
