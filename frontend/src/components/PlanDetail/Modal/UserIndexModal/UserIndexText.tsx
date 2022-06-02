import React from 'react';
import {
  NormalBoldText,
  NormalLightText,
  NormalRegularText,
  NormalLightSpan,
  NormalRegularSpan,
  NormalBoldSpan,
} from '../../styles';
export function UserIndexText() {
  return (
    <>
      <NormalBoldText style={{ margin: '0px' }}>유저지수</NormalBoldText>
      <NormalRegularText style={{ fontSize: '18px' }}>
        {'같은 연령, 성별 유저들에게'}
        <NormalBoldSpan style={{ color: '#1a90ff', fontSize: '18px' }}>
          {' 얼마나 선택받은 보험인지 '}
        </NormalBoldSpan>
        {'알려주는 지수예요.'}
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '16px', marginBottom: '0px' }}
      >
        지수 계산법
      </NormalBoldText>
      <NormalRegularText
        style={{ color: 'grey', fontSize: '17px', marginTop: '0px' }}
      >
        (해당 보험상품에 대한 20대 남성 가입자 수 / 모든 보험상품에 대한 20대
        남성 가입자 수)
      </NormalRegularText>
      <NormalRegularText
        style={{
          color: 'grey',
          fontSize: '15px',
          marginTop: '0px',
          marginBottom: '0px',
        }}
      >
        데이터 레퍼런스 : 한국신용정보원에서 제공한 모의금융DB
      </NormalRegularText>
    </>
  );
}
