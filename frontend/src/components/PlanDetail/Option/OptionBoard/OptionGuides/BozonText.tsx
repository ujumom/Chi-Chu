import React from 'react';
import {
  NormalBoldText,
  NormalRegularText,
  NormalLightText,
  NormalBoldSpan,
} from '../../../styles';
import { TextBoard, Image } from './styles';

export function BozonText() {
  return (
    <TextBoard>
      <NormalBoldText style={{ color: '#3e5060', marginTop: '0px' }}>
        치아보존치료
      </NormalBoldText>
      <Image src="/images/plandetail/modal/bozon1.png" alt="보존치료설명" />
      <NormalBoldText
        style={{
          fontSize: '21px',
          marginTop: '10px',
          color: '#1a90ff',
          marginBottom: '7px',
        }}
      >
        치아보존치료란?
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        {' 보통 충치가 생겼을 때 '}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {`'이를 때우거나', '완전히 덮어씌우는'`}
        </NormalBoldSpan>
        {' 치료를 뜻해요.'}
        {' 발치하지 않고 '}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {'기존의 치아를 보존해'}
        </NormalBoldSpan>
        {' 본연의 기능을 유지할 수 있도록 도움을 줘요.'}
        <br />
        <br />
        <NormalBoldSpan style={{ color: '#1a90ff', fontSize: '18px' }}>
          {'유아부터 30대 이하까지는'}
        </NormalBoldSpan>
        {' 보존치료처럼 가벼운 치료를 많이 찾기 때문에 나이대에 맞춰 '}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {'치아 보존치료 보장금액'}
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
        치아 보존치료 종류
      </NormalBoldText>
      <Image src="/images/plandetail/modal/bozon2.png" alt="보존치료소재" />
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        1. 크라운
      </NormalBoldText>
      <NormalRegularText
        style={{
          marginTop: '0px',
          fontSize: '18px',
          color: '#3e5060',
        }}
      >
        {'크게 손상된 치아나 신경치료를 받은 치아 등을 '}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 전체적으로 덮어 씌워 주는'}
        </NormalBoldSpan>
        {' 치료를 말해요.'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 건강보험은 적용되지 않아 비싸고, '}
        </NormalBoldSpan>
        {'금이나 도자기 재료(세라믹)등 단단한 재료로 제작해요.'}
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        2. 아말감
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        {'어금니에서'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 충치'}
        </NormalBoldSpan>
        {'가 생겼을 때 때우는'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 회색빛 나는 재료'}
        </NormalBoldSpan>
        {'에요.'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 건강보험 적용이 되는 치료'}
        </NormalBoldSpan>
        {'이기 때문에 치료비로 내야 하는 본인부담금이 대부분'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 만원 안팎 '}
        </NormalBoldSpan>
        {'수준으로'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 저렴해요. '}
        </NormalBoldSpan>
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        3. 레진
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        {'충치 치료 당일에 '}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {'치아색상으로 때우는 치료'}
        </NormalBoldSpan>
        {'에요.'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 만 12세 이하 어린이'}
        </NormalBoldSpan>
        {'는 '}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {'건강보험이 적용'}
        </NormalBoldSpan>
        {'되기 시작해'}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 3만원 내외로'}
        </NormalBoldSpan>
        {
          ' 치료를 받을 수 있고, 만 12세 초과 연령에서는 건강보험이 적용되지 않아요.'
        }
      </NormalRegularText>
    </TextBoard>
  );
}
