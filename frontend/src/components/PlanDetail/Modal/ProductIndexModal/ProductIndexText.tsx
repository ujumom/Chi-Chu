import React from 'react';
import {
  NormalBoldText,
  NormalLightText,
  NormalRegularText,
  NormalLightSpan,
  NormalRegularSpan,
  NormalBoldSpan,
} from '../../styles';

export function ProductIndexText() {
  return (
    <>
      <NormalBoldText style={{ margin: '0px' }}>상품지수</NormalBoldText>
      <NormalRegularText style={{ fontSize: '18px' }}>
        {'납입하는 보험료에 비해'}
        <NormalBoldSpan style={{ color: '#1a90ff', fontSize: '18px' }}>
          {' 얼마나 보장을 해주는 지 '}
        </NormalBoldSpan>
        {'알려주는 지수에요.'}
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '16px', marginBottom: '0px' }}
      >
        지수 계산법
      </NormalBoldText>

      <NormalRegularText
        style={{ color: 'grey', fontSize: '17px', marginTop: '0px' }}
      >
        ( 보험 상품의 보장금액 총합/ 납입보험료 ) + 보험 상품의 담보 갯수
      </NormalRegularText>
    </>
  );
}
