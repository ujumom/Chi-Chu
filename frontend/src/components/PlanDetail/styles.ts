import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { CenterFocusStrong } from '@mui/icons-material';

export const Board = styled('div')`
  display: flex;
  flex-direction: row;
`;

export const StyledBox = styled(Box)`
  max-width: '70vw';
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
`;

export const OptionBoxButton = styled(Button)`
  text-align: center;
`;

export const NormalBoldText = styled('p')`
  font-family: NotoSansKRBold;
  font-size: 30px;
  margin-top: 0px;
`;
export const NormalRegularText = styled('p')`
  font-family: NotoSansKRRegular;
  font-size: 16px;
`;
export const NormalLightText = styled('p')`
  font-family: NotoSansKRLight;
  font-size: 17px;
`;
export const NormalBoldSpan = styled('span')`
  font-family: NotoSansKRBold;
  font-size: 30px;
`;

export const NormalRegularSpan = styled('span')`
  font-family: NotoSansKRRegular;
  font-size: 16px;
`;
export const NormalLightSpan = styled('span')`
  font-family: NotoSansKRLight;
  font-size: 17px;
`;

export const GreyRegularText = styled('p')`
  font-family: NotoSansKRRegular;
  color: grey;
  margin-bottom: 0px;
  margin-top: 50px;
`;
export const GreyRegularSpan = styled('span')`
  font-family: NotoSansKRRegular;
  color: grey;
  margin-bottom: 0px;
  margin-top: 50px;
`;

export const HorizontalLine = styled('div')`
  border-bottom: 1px solid #cdd2d7;
  width: '100%';
`;
