import * as React from 'react';
import { Box, Button } from '@mui/material';
import { textAlign } from '@mui/system';
import { BOX_RIGHT, DD_RIGHT, DD_LEFT } from './styles';
import { CustomButtonRoot } from '../../Common/CHICHUButton/styles';
import Link from '@mui/material/Link';
import { NormalBoldText, NormalRegularText, HorizontalLine } from '../styles';

type PropType = {
  gender: number;
  age: number;
  rate: number;
  py: number;
  link: string;
};

function RightBox(props: PropType) {
  let gender_str = '';

  if (props.gender === 1) {
    gender_str = '남성';
  } else if (props.gender === 2) {
    gender_str = '여성';
  } else {
    gender_str = '성별 알수 없음';
  }

  return (
    <BOX_RIGHT>
      <NormalBoldText style={{ fontSize: '24px' }}>
        {gender_str}, {props.age}세 기준
      </NormalBoldText>
      <hr />
      <div>
        <DD_LEFT>납입기간</DD_LEFT>
        <DD_RIGHT>{props.py}년</DD_RIGHT>
      </div>
      <div>
        <DD_LEFT>보장기간</DD_LEFT>
        <DD_RIGHT>{props.py}년</DD_RIGHT>
      </div>
      <hr />
      <h1>월 {props.rate.toLocaleString()}원</h1>
      <Link href={props.link}>
        <CustomButtonRoot style={{ margin: '0px' }}>
          보험사 사이트 가기
        </CustomButtonRoot>
      </Link>
    </BOX_RIGHT>
  );
}

export default RightBox;
