import styled from 'styled-components';
import { blue } from '../../../styles/Colors';
import { CustomBannerButtonRoot } from '../Banner/styles';

export const CustomTipButtonRoot = styled(CustomBannerButtonRoot)`
  background-color: #fff;
  color: ${blue[500]};
  &:hover {
    background-color: ${blue[100]};
  }
`;
