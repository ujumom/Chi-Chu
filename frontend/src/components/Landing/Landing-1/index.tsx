import React, { useEffect, useState } from 'react';
import {
  LandingContainer,
  LandingContent,
  LandingContentColor,
  LandingSubContent,
} from './styles';
import { Box, Button, Container } from '@mui/material';
import comfort_svg from './image.svg';
import { Fade } from 'react-awesome-reveal';

function LandingFirst() {
  return (
    <>
      <LandingContainer>
        <Container>
          <Box
            sx={{
              paddingTop: 10,
              paddingBottom: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Fade cascade>
              <LandingContent>
                <LandingContentColor>안심하세요</LandingContentColor>
              </LandingContent>
              <LandingContent>
                이름과 연락처 <br />
                <LandingContentColor>함부로 묻지않아요</LandingContentColor>
              </LandingContent>
              {/* <LandingContent>최소한의 정보로 간편하게 추천해요</LandingContent> */}

              <LandingContent>
                <p>
                  <img src={comfort_svg} width="50%" />
                </p>
                <LandingSubContent>
                  복잡한 절차는 필요하지 않아요 <br />
                  최소한의 개인정보로 <b>간편하게</b> 확인할 수 있어요
                </LandingSubContent>
              </LandingContent>
            </Fade>
          </Box>
        </Container>
      </LandingContainer>
    </>
  );
}

export default LandingFirst;
