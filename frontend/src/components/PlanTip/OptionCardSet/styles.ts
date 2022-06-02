import { styled } from '@mui/system';

export const SceneCard = styled('div')`
width: 200px;
height: 260px;
background-color:#3399ff;
border: 1px solid #DAECFF;
cursor: pointer;
box-shadow: 5px 5px 7px 5px #DAECFF;
}
`;

export const Container = styled('div')`
margin-top: 50px;
display: grid;
grid-template-columns: 250px 250px 250px;
gap: 60px;
text-align:center;
margin-bottom: 60px;
}
`;
export const Box = styled('div')`
width: 300px;
height: 260px;
}
`;

export const Description = styled('p')`
  font-size: 16px;
  font-family: NotoSansKRRegular;
  white-space: pre-wrap;
  color: white;
  margin-top: 0px;
`;
export const OptionName = styled('h3')`
  font-size: 18px;
  font-family: NotoSansKRRegular;
  color: white;
  margin-bottom: 0px;
`;
export const FindText = styled('h3')`
  font-size: 13px;
  font-family: NotoSansKRRegular;
  color: #3399ff;
  cursor: pointer;
`;
export const Symptom = styled('h2')`
  font-size: 18px;
  font-family: NotoSansKRBold;
  white-space: pre-wrap;
  margin-bottom: 10px;
  margin-top: 19px;
  color: white;
`;
