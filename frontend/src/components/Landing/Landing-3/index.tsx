import React from 'react';
import { Box, Button, Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import comfort_svg from './image.svg';
import {
  LandingContainerWhite,
  LandingTitle,
  LandingBoxContent,
  LandingBoxContentColor,
  LandingBoxLabel,
} from './styles';
import { LandingSubContent } from '../Landing-1/styles';
import { Slide } from 'react-awesome-reveal';
import { Fade } from 'react-awesome-reveal';

import Paper from '@mui/material/Paper';

function LandingThird() {
  return (
    <LandingContainerWhite>
      <Container sx={{ textAlign: 'center', padding: '3% 0px' }}>
        <LandingTitle>꼼꼼하게 따져 추천할게요</LandingTitle>
        <LandingSubContent>
          다양한 치아보험 상품 중 무엇을 선택해야할 지 모르시겠다고요? 🤔
          <br />
          객관성을 유지하기 위해 세 가지 요인을 적절한 가중치로 산출한
          치츄지수를 만나보세요!
        </LandingSubContent>

        <Stack spacing={10} direction="row" sx={{ padding: '8% 0px' }}>
          <Fade cascade>
            <Box sx={{ width: '21rem' }}>
              <LandingBoxLabel>회사지수</LandingBoxLabel>
              <Paper
                elevation={1}
                sx={{
                  // flex: 1,
                  bgcolor: '#f8f8f8',
                  padding: '1.7rem 2rem',
                  borderRadius: '1rem',
                  textAlign: 'center',
                }}
              >
                <LandingBoxContent>
                  보험금의 <LandingBoxContentColor>지급</LandingBoxContentColor>
                  이 <br />잘 이루어지는가?
                </LandingBoxContent>
              </Paper>
            </Box>

            <Box sx={{ width: '21rem' }}>
              <LandingBoxLabel>상품지수</LandingBoxLabel>
              <Paper
                elevation={1}
                sx={{
                  // flex: 1,
                  bgcolor: '#f8f8f8',
                  padding: '1.7rem 2rem',
                  borderRadius: '1rem',
                  textAlign: 'center',
                }}
              >
                <LandingBoxContent>
                  합리적인 <LandingBoxContentColor>가격</LandingBoxContentColor>
                  으로 <br />
                  보장해주는가?
                </LandingBoxContent>
              </Paper>
            </Box>
            <Box sx={{ width: '21rem' }}>
              <LandingBoxLabel>유저지수</LandingBoxLabel>
              <Paper
                elevation={1}
                sx={{
                  // flex: 1,
                  bgcolor: '#f8f8f8',
                  padding: '1.7rem 2rem',
                  borderRadius: '1rem',
                  textAlign: 'center',
                }}
              >
                <LandingBoxContent>
                  나와 같은 유저의{' '}
                  <LandingBoxContentColor>선택</LandingBoxContentColor>을 <br />
                  많이 받았는가?
                </LandingBoxContent>
              </Paper>
            </Box>
          </Fade>
        </Stack>
      </Container>
    </LandingContainerWhite>
  );
}

export default LandingThird;
