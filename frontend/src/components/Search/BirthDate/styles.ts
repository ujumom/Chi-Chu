import { styled } from '@mui/system';
import { grey } from '../../../styles/Colors';

export const StyledInput = styled('input')(
  ({ theme }) => `
  // position: absolute;
  font-family: NotoSansKRRegular;
  font-size: 1.1rem;
  box-sizing: border-box;
  min-height: calc(2em + 22px);
  min-width: 330px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin: 0.25em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:focus {
    outline: none;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  }
  `,
);

export const InsuranceDate = styled('span')(
  `
  position: absolute;
  left: 180px;
  top: 50%;
  margin-top:10px;
  width: 200px;
  color: gray;
  `,
);

export const BirthDateMessage = styled('span')`
  font-family: NotoSansKRLight;
  font-size: 1.1rem;
  &&& {
    margin: 0 20px;
  }
`;
