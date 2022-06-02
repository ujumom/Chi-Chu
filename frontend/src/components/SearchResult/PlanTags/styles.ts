import { styled } from '@mui/system';
import { blue, grey } from '../../../styles/Colors';

type props = {
  istag: string | null;
};

export const PlanTagButton = styled('button')<props>`
  font-family: NotoSansKRRegular;
  font-size: 0.9rem;
  background-color: ${props => (props.istag ? blue[400] : blue[200])};
  // opacity: ${props => (props.istag ? 1 : 0.9)};
  padding: 10px 10px;
  border-radius: 0.9rem;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.1s linear;

  &:hover {
    background-color: ${props => (props.istag ? blue[400] : blue[400])};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
  }
`;

export const TagRateContainer = styled('div')`
  margin-top: 3rem;
`;

export const TagLabel = styled('span')`
  font-family: NotoSansKRMedium;
  font-size: 1rem;
  color: ${grey[700]};
  width: 100%;
  padding-top: 3px;
  padding-bottom: 5px;
`;

export const BoldLabel = styled('span')`
  font-family: NotoSansKRBold;
  font-weight: bold;
`;

export const RateLabel = styled('span')`
  font-family: NotoSansKRMedium;
  font-size: 1rem;
  color: ${grey[700]};
  width: 500px;
  margin-top: 2rem;
  padding-top: 3px;
  padding-bottom: 5px;
`;
