import React from 'react';
import { Board, GreyRegularText, StyledBox } from '../styles';
import { StylesProvider } from '@material-ui/core/styles';
import { NormalLightText, NormalBoldText, NormalRegularText } from '../styles';
import { VerticalLine, Title, NumberText } from './styles';
import CompanyIndexModal from '../Modal/CompanyIndexModal';
import { ProductIndexText } from '../Modal/ProductIndexModal/ProductIndexText';
import ProductIndexModal from '../Modal/ProductIndexModal';
import UserIndexModal from '../Modal/UserIndexModal';

type IndexType = {
  CompanyIndex: number;
  ProductIndex: number;
  UserIndex: number;
};

function IndexBox(props: IndexType) {
  return (
    <>
      <Board
        style={{
          textAlign: 'center',
          margin: 'auto auto',
          justifyContent: 'space-evenly',
          marginTop: '20px',
        }}
      >
        <StylesProvider injectFirst>
          <StyledBox>
            <Title>회사지수</Title>
            <CompanyIndexModal />
            <NumberText style={{ fontSize: '30px' }}>
              {props.CompanyIndex}
            </NumberText>
          </StyledBox>
          <VerticalLine />
          <StyledBox>
            <Title>상품지수</Title>
            <ProductIndexModal />
            <NumberText style={{ fontSize: '30px' }}>
              {props.ProductIndex}
            </NumberText>
          </StyledBox>
          <VerticalLine />
          <StyledBox>
            <Title>유저지수</Title>
            <UserIndexModal />
            <NumberText style={{ fontSize: '30px' }}>
              {props.UserIndex}
            </NumberText>
          </StyledBox>
        </StylesProvider>
      </Board>
    </>
  );
}

export default IndexBox;
