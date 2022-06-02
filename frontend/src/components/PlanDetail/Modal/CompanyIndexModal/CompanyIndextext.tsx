import React from 'react';
import {
  NormalBoldText,
  NormalRegularText,
  NormalBoldSpan,
  NormalLightSpan,
} from '../../styles';
import BasicTable from './BasicTable';
import { SmallP } from './styles';

export default function CompanyIndexText() {
  return (
    <>
      <NormalBoldText style={{ margin: '0px' }}>회사지수</NormalBoldText>
      <NormalRegularText style={{ fontSize: '18px' }}>
        {'보험금 지급과 관련해'}
        <NormalBoldSpan style={{ color: '#1a90ff', fontSize: '18px' }}>
          {' 보험회사의 신뢰도를 '}
        </NormalBoldSpan>
        {'알려주는 지수에요.'}
      </NormalRegularText>
      <BasicTable />
      <br />
      <NormalRegularText style={{ fontSize: '18px', marginTop: '0px' }}>
        <NormalBoldSpan style={{ color: '#1a90ff', fontSize: '18px' }}>
          {
            '실제로 보험금을 잘 지급해 주는지, 재정적으로 보험금 지급에 무리가 없는지'
          }
        </NormalBoldSpan>
        {' 등도 보험을 선택할 때 눈여겨봐야 하는데요, '}
        <br />
        <NormalBoldSpan style={{ color: '#1a90ff', fontSize: '18px' }}>
          {'치츄'}
        </NormalBoldSpan>
        {'에서는 위의 표에서처럼 '}
        <NormalBoldSpan style={{ color: '#1a90ff', fontSize: '18px' }}>
          {'8개의 통계적 요인'}
        </NormalBoldSpan>
        {'에 따라 '}
        <NormalBoldSpan style={{ color: '#1a90ff', fontSize: '18px' }}>
          {'보험회사에 대한 신뢰도'}
        </NormalBoldSpan>
        {'를 지수로 산출했어요.'}
      </NormalRegularText>
      <br />
      <NormalBoldText
        style={{ fontSize: '14px', color: 'grey', marginBottom: '8px' }}
      >
        측정기준시기
      </NormalBoldText>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        지급여력비율: 2020.12 (4분기) 기준 /{' '}
      </NormalLightSpan>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        민원청구:2021.12 (4분기) 기준 /{' '}
      </NormalLightSpan>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        부지급률:2021 상반기 기준 /{' '}
      </NormalLightSpan>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        평균지급기간:2021 상반기 기준 /{' '}
      </NormalLightSpan>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        평균지연기간:2021 상반기 기준 /{' '}
      </NormalLightSpan>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        지급지연율:2021 상반기 기준 /{' '}
      </NormalLightSpan>
      <br />
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        부채비율:2021.9 공시 기준 /{' '}
      </NormalLightSpan>
      <NormalLightSpan style={{ fontSize: '14px', color: 'grey' }}>
        순자산:2021.9 공시 기준
      </NormalLightSpan>
    </>
  );
}
