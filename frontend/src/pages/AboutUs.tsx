import { Box, Container } from '@mui/material';
import React from 'react';
import UCC from '../components/AboutUs/UCC';
import Header from '../components/Common/Header';

function AboutUs() {
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ paddingTop: '10%', height: '100vh', paddingBottom: '10%' }}>
          <UCC />
        </Box>
      </Container>
    </>
  );
}

export default AboutUs;
