import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import QuestionTooltip from '../QuestionTooltip';
import { ChiChuText, BorderLinearProgress } from './styles';
import {
  NormalLightText,
  NormalBoldText,
  NormalRegularText,
  GreyRegularText,
} from '../styles';
import { Box } from '@mui/system';
export type ProgressBarType = {
  plan_score: number;
  plan_average: number;
};

export default function ProgressBar(props: ProgressBarType) {
  let status = '';
  if (props.plan_average + 5 <= props.plan_score) {
    status = '평균 이상';
  } else if (
    props.plan_average - 5 <= props.plan_score &&
    props.plan_average + 5 > props.plan_score
  ) {
    status = '평균 정도';
  } else {
    status = '평균 이하';
  }

  //linear bar 애니메이션
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = 5;
        return Math.min(oldProgress + diff, props.plan_score);
      });
    }, 150);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Box sx={{ textAlign: 'left', maxWidth: '70vw' }}>
        <GreyRegularText>보험종합평가</GreyRegularText>
        <NormalBoldText style={{ display: 'inline-block', marginTop: '10px' }}>
          이 보험의
          <span
            style={{
              fontFamily: 'NotoSansKRBold',
              fontSize: '30px',
              color: '#1a90ff',
            }}
          >
            &nbsp;치츄지수
          </span>
          는
          <br />
          보험 상품 중 <ChiChuText>{status}입니다!</ChiChuText>
        </NormalBoldText>
        <QuestionTooltip />
        <GreyRegularText style={{ marginTop: '0px' }}>
          '치츄지수'는 아래의 세 가지 지수를 종합한 수치입니다.
          <br />
          물음표 아이콘을 클릭하시면 각 지수에 대해 더 상세히 알려드려요!
        </GreyRegularText>
        <Typography
          variant="h6"
          align="right"
          sx={{
            fontFamily: 'NotoSansKRBold',
            fontSize: '40px',
            color: '#1a90ff',
          }}
        >
          {props.plan_score}
        </Typography>
        <BorderLinearProgress variant="determinate" value={progress} />
        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant="caption"
            color="#1a90ff"
            sx={{ fontFamily: 'NotoSansKRLight', fontSize: '16px' }}
          >
            0
          </Typography>
          <Typography
            variant="caption"
            color="#1a90ff"
            sx={{
              fontFamily: 'NotoSansKRLight',
              fontSize: '16px',
              marginLeft: '13vw',
            }}
          >
            평균 {props.plan_average}
          </Typography>
          <Typography
            variant="caption"
            color="#1a90ff"
            sx={{ fontFamily: 'NotoSansKRLight', fontSize: '16px' }}
          >
            100
          </Typography>
        </Stack>
      </Box>
    </>
  );
}

ProgressBar.defaultProps = {
  plan_average: 50,
};
