import React from 'react';
import Container from '@mui/material/Container';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';
import {
  Background,
  ChiChu,
  ChiChuAnimation,
  ChichuColor,
  Content,
  ContentDiv,
  CustomBannerButtonRoot,
  Title,
  TitleSmall,
} from './styles';
import { useNavigate } from 'react-router-dom';

function CustomButton(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} component={CustomBannerButtonRoot} />;
}

function Banner() {
  const navigate = useNavigate();
  return (
    <div>
      <Background src="/images/randing/background.png" />
      <Container>
        <ChiChuAnimation>
          <ChiChu src="/images/randing/chichu.png" alt="" />
        </ChiChuAnimation>
        <ContentDiv>
          <Title>Chi Chu</Title>
          <Content>치츄가 찾아줄게요!</Content>
          <Content>빅데이터 치아보험 추천 서비스</Content>
          <CustomButton onClick={() => navigate('search')}>
            치츄 시작하기
          </CustomButton>
        </ContentDiv>
      </Container>
    </div>
  );
}

export default Banner;
