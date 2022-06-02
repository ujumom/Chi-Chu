import { Stack, Typography } from '@mui/material';

import { BorderLinearProgress } from './styles';
import { ProgressBarWithNumberType } from '../../../types/types';

function ProgressBarWithNumber(props: ProgressBarWithNumberType) {
  return (
    <div>
      {/* <Typography variant="h6" align="right">
        {props.plan_score}
      </Typography>
      <BorderLinearProgress variant="determinate" value={props.plan_score} />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="caption" color="skyblue">
          0
        </Typography>
        <Typography variant="caption" color="skyblue">
          평균 {props.plan_average}
        </Typography>
        <Typography variant="caption" color="skyblue">
          100
        </Typography>
      </Stack> */}
      <Typography
        variant="h6"
        align="right"
        sx={{
          fontFamily: 'NotoSansKRBold',
          fontSize: '22px',
          color: '#1a90ff',
        }}
      >
        {props.plan_score}
      </Typography>
      <BorderLinearProgress variant="determinate" value={props.plan_score} />
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="caption"
          color="#1a90ff"
          sx={{ fontFamily: 'NotoSansKRLight', fontSize: '14px' }}
        >
          0
        </Typography>
        <Typography
          variant="caption"
          color="#1a90ff"
          sx={{
            fontFamily: 'NotoSansKRLight',
            fontSize: '14px',
            marginLeft: '6vw',
          }}
        >
          평균 {props.plan_average}
        </Typography>
        <Typography
          variant="caption"
          color="#1a90ff"
          sx={{ fontFamily: 'NotoSansKRLight', fontSize: '14px' }}
        >
          100
        </Typography>
      </Stack>
    </div>
  );
}

ProgressBarWithNumber.defaultProps = {
  plan_average: 52.64,
};

export default ProgressBarWithNumber;
