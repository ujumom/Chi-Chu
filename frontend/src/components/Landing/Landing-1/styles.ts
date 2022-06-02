import styled from 'styled-components';
import { blue } from '../../../styles/Colors';

export const LandingContainer = styled.div`
  padding-top: 100vh;
  width: 100%;
`;

export const LandingContent = styled.h2`
  font-family: NotoSansKRRegular;
  font-size: 2.4rem;
`;

export const LandingContentColor = styled.span`
  font-family: NotoSansKRRegular;
  font-size: 2.5rem;
  color: ${blue[600]};
`;

export const LandingSubContent = styled.p`
  font-family: NotoSansKRLight;
  font-size: 1.5rem;
`;
