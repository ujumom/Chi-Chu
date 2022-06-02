import React from 'react';
import {
  NormalBoldText,
  NormalRegularText,
  NormalLightText,
  NormalBoldSpan,
} from '../../../styles';
import { TextBoard } from './styles';

export function ETC() {
  return (
    <TextBoard>
      <NormalBoldText style={{ color: '#3e5060', marginTop: '0px' }}>
        기타 담보 설명
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          치아 보철, 보존, 치조골이식술
        </NormalBoldSpan>
        을 제외한 치료들은 모두{' '}
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          건강보험이 적용되어 치료비가 저렴해요.
        </NormalBoldSpan>{' '}
        따라서, 아래 기타 항목들을 위해 치아보험을 가입하는 것은
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 권장하지 않아요.'}
        </NormalBoldSpan>
      </NormalRegularText>
      <br />
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        잇몸질환
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        세균에 의해 치아주위
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 잇몸의 염증이 생겨서 '}
        </NormalBoldSpan>
        잇몸뼈가 내려앉거나 잇몸뼈가 파괴 되는 질환이에요.
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        치조골 이식수술
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {'임플란트 치료와 항상 연계되는 치료로, '}
        </NormalBoldSpan>
        잇몸뼈가 없는 부위에 뼈를 이식하는 수술이에요.
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 건강보험이 적용되지 않아서 '}
        </NormalBoldSpan>
        진료비도 상당하기 때문에 임플란트의 보장조건과 같거나 비슷한 경우가
        많아요.
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        스케일링
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        치아 표면에 붙어있는
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 치석을 긁어내는 행위'}
        </NormalBoldSpan>
        를 뜻해요. 현재
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 잇몸 질환 예방 목적의 스케일링'}
        </NormalBoldSpan>
        은 성인의 경우
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 1년에 1회 의료 보험'}
        </NormalBoldSpan>
        으로 진행이 가능해요. 보통 제거된 치석과 치태는 3개월 정도면 원상복구
        되므로
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 3개월에 한번 '}
        </NormalBoldSpan>
        정도는 치과에 방문하는 것이 좋아요.
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        치아골절 진단비
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        치아가
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 깨지거나 부러진 경우 '}
        </NormalBoldSpan>
        진단비를 지급해요.
      </NormalRegularText>
      <NormalBoldText
        style={{ color: '#1a90ff', fontSize: '18px', marginBottom: '7px' }}
      >
        X-RAY 촬영
      </NormalBoldText>
      <NormalRegularText
        style={{ marginTop: '0px', fontSize: '18px', color: '#3e5060' }}
      >
        치아 뿌리의 염증이나 신경의 문제, 잇몸 내부에 숨어 있는 매복니 등은 물론
        어린이들의 영구치가 다 존재하는지
        <NormalBoldSpan style={{ color: '#3e5060', fontSize: '18px' }}>
          {' 알아보는 수단'}
        </NormalBoldSpan>
        으로도 중요한 역할을 해요.
      </NormalRegularText>
    </TextBoard>
  );
}
