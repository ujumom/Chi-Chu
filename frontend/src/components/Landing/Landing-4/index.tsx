import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LandingContent, LandingSubContent } from '../Landing-1/styles';
import comfort_svg from './image.svg';
import {
  LandingContainerBlue,
  LandingSubContentColor,
  LandingTitleWhite,
} from '../Landing-2/styles';
import { CustomTipButtonRoot } from './styles';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';

function CustomButton(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} component={CustomTipButtonRoot} />;
}

function LandingFourth() {
  const navigate = useNavigate();
  return (
    <LandingContainerBlue>
      <Container>
        <Stack spacing={10} direction="row" sx={{ padding: '10% 0px' }}>
          <Box>
            <LandingTitleWhite>
              치아보험에 대한 이해부터 시작해요
            </LandingTitleWhite>
            <LandingSubContentColor>
              보험이 복잡하고 어렵게만 느껴지시나요? <br />
              쉽게 정리한 포스터부터 담보까지
              <br />
              치아보험의 모든 것을 치츄가 소개해드립니다!
            </LandingSubContentColor>
            <CustomButton onClick={() => navigate('/tip')}>
              보험TIP 바로가기
            </CustomButton>
          </Box>
          <Box>
            <p>
              <img src={comfort_svg} width="150%" />
            </p>
          </Box>
        </Stack>
      </Container>
    </LandingContainerBlue>
  );
}

export default LandingFourth;
