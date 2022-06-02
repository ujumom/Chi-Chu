import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
  return (
    <CircularProgress
      disableShrink={true}
      size={120}
      thickness={2}
      sx={{
        marginTop: '40vh',
        marginLeft: '50vw',
      }}
    />
  );
}

export default Loading;
