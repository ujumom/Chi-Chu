import React from 'react';
import {
  NormalBoldText,
  NormalRegularText,
  NormalLightText,
  NormalBoldSpan,
} from '../../../styles';
import { TextBoard, Image } from './styles';

export function BochulText() {
  return (
    <TextBoard>
      <NormalBoldText style={{ color: '#3e5060', marginTop: '0px' }}>
        치아보철치료
      </NormalBoldText>
      <Image src="/images/plandetail/modal/bochul1.png" alt="보철치료설명" />
      <NormalBoldText
        style={{
          fontSize: '21px',
          marginTop: '10px',
          color: '#1a90ff',
          marginBottom: '7px',
        }}
      >
        보철치료란?
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        {'빠진 치아의 기능을 대신할 '}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {'인공 치아를 심는 치료'}
        </NormalBoldSpan>
        {'예요.'}
        <br />
        <br />
        <NormalBoldSpan style={{ color: '#1a90ff', fontSize: '18px' }}>
          {' 40대 이상부터 '}
        </NormalBoldSpan>
        {'인공치아를 많이 찾기 때문에 나이대에 맞춰'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 치아 보철치료 보장금액'}
        </NormalBoldSpan>
        {'을 꼭 확인해주세요.'}
      </NormalRegularText>
      <br />
      <NormalBoldText
        style={{
          fontSize: '21px',
          marginTop: '10px',
          color: '#3e5060',
          marginBottom: '7px',
        }}
      >
        치아보철 치료 종류
      </NormalBoldText>
      <Image
        src="/images/plandetail/modal/bochul2.png"
        alt="임플란트.브릿지.틀니 설명"
      />
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        1. 임플란트란?
      </NormalBoldText>
      <NormalRegularText
        style={{
          marginTop: '0px',
          fontSize: '18px',
          color: '#3e5060',
        }}
      >
        {'없어진 치아를 대신할 수 있도록'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 철심을 박아 의치를 붙여 '}
        </NormalBoldSpan>
        {'기능을 회복하는 치료에요.'}
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        2. 틀니란?
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        {'없어진 치아를 대신해'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 잇몸에 끼워서 '}
        </NormalBoldSpan>
        {'음식물을 씹을 수 있도록 인공적으로 만든'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 틀 모양의 이'}
        </NormalBoldSpan>
        {'를 말해요.'}
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        3. 브릿지란?
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        {'없어진 치아의'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 양 옆 치아를 '}
        </NormalBoldSpan>
        {'적절하게 다듬어 지지대로 삼아 '}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {'다리처럼 연결해 '}
        </NormalBoldSpan>
        {'기능을 회복시키는 치료예요.'}
      </NormalRegularText>
    </TextBoard>
  );
}
