import styled from 'styled-components';
import { blue } from '../../../styles/Colors';
import { LandingSubContent } from '../Landing-1/styles';
import { LandingTitle } from '../Landing-3/styles';

export const LandingContainerBlue = styled.div`
  width: 100%;
  background-color: ${blue[400]};
`;

export const LandingTitleWhite = styled(LandingTitle)`
  font-family: NotoSansKRRegular;
  font-size: 2.8rem;
  color: #fff;
`;

export const LandingSubContentColor = styled(LandingSubContent)`
  color: #fff;
`;
