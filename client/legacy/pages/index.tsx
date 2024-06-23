import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material';

const Index = () => {
  const router = useRouter();
  useEffect(() => { router.push('/tracks') }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  )
}

export default Index