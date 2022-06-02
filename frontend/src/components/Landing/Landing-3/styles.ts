import styled from 'styled-components';
import { blue, grey } from '../../../styles/Colors';
import { LandingSubContent } from '../Landing-1/styles';

export const LandingContainerWhite = styled.div`
  width: 100%;
`;

export const LandingTitle = styled.h2`
  font-family: NotoSansKRRegular;
  font-size: 2.8rem;
`;

export const LandingBoxContent = styled.span`
  font-family: NotoSansKRRegular;
  font-size: 1.5rem;
  // color: ${grey[500]};
`;

export const LandingBoxContentColor = styled(LandingBoxContent)`
  color: ${blue[600]};
`;

export const LandingBoxLabel = styled.p`
  font-family: NotoSansKRRegular;
  font-size: 1.6rem;
  margin-bottom: 15px;
  // color: ${grey[800]};
  font-weight: bold;
`;
