import React from 'react';
import {
  NormalBoldText,
  NormalRegularText,
  NormalLightText,
  NormalBoldSpan,
} from '../../../styles';
import { TextBoard } from './styles';

export function SingyeongText() {
  return (
    <>
      <NormalBoldText style={{ color: '#3e5060', marginTop: '0px' }}>
        치아신경치료
      </NormalBoldText>
      <NormalBoldText
        style={{
          fontSize: '21px',
          marginTop: '10px',
          color: '#1a90ff',
          marginBottom: '7px',
        }}
      >
        신경치료란?
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {'충치가 심해 내부까지 도달하게 되면'}
        </NormalBoldSpan>
        {
          ' 잇몸이 붓고 찬 음식이나 뜨거운 음식을 먹을 때 통증으로 불편함을 느끼게 돼요.'
        }
        <br />
        <br />
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {'신경치료는'}
        </NormalBoldSpan>
        {' 이러한 증상이 생기면 치아 내부에'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 염증이 생긴 신경을 제거'}
        </NormalBoldSpan>
        {'한 뒤에, 신경이 자리잡은 공간을 깨끗이 청소하고'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 충전물을 채워주는 '}
        </NormalBoldSpan>
        {'치료법이에요.'}
      </NormalRegularText>
    </>
  );
}
