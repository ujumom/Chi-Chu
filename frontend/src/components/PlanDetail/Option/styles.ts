import styled from 'styled-components';

export const DL = styled.dl``;
export const DT = styled.div`
  background-color: #daecff;
  padding: 0;
  width: 100%;
  display: inline-block;
  text-align: left;
  border-top: 2px solid #1a90ff;
`;
export const DD_LEFT = styled.td`
  font-family: NotoSansKRRegular;
  float: left;
  padding-left: 10px;
  margin-bottom: 10px;
  text-align: left;
  word-break: keep-all;
  color: #6f7e8c;
`;
export const DD_RIGHT = styled.td`
  font-family: NotoSansKRRegular;
  float: right;
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
  text-align: right;
  word-break: keep-all;
  color: #6f7e8c;
`;

export const JisuText = styled('span')`
  font-family: NotoSansKRBold;
  font-size: 17px;
  text-align: left;
  margin-left: 10px;
  color: #3e5060;
`;

export const StyledModal = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
