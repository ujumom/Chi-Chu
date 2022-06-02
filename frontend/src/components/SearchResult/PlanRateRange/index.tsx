import * as React from 'react';
import Box from '@mui/material/Box';
import { useRecoilState } from 'recoil';
import { PlanListSelector } from '../../../recoil/PlanListSelector';
import { PlanRateRangeSlider } from './styles';
import { PlanListType } from '../../../types/types';

function valuetext(value: number) {
  return `${value}원`;
}

export default function PlanRateRange() {
  const [planFilteredList, setPlanFilteredList] =
    useRecoilState(PlanListSelector);
  // console.log(plans);
  const [planRate, setPlanRate] = React.useState([0, 0]);
  const [maxRate, setMaxRate] = React.useState(0);
  // console.log(planFilteredList);

  const planRateLst: any = [];
  // const maxRate = 0;
  React.useEffect(() => {
    planFilteredList?.cheap.map(product => planRateLst.push(product.rate));
    // console.log(planRateLst);
    setPlanRate([0, Math.max(...planRateLst)]);
    setMaxRate(Math.max(...planRateLst));
  }, []);

  // console.log(planRateLst, planRate);

  // 납입금액별 필터
  React.useEffect(() => {
    // function checkRanged(rate: number) {
    //   if (rate >= planRate[0] && rate <= planRate[1]) {
    //     return true;
    //   }
    // }

    if (planFilteredList) {
      const newDict: PlanListType = { ...planFilteredList };
      ['cheap', 'chichu', 'coverage'].forEach(planType => {
        newDict[planType] = planFilteredList[planType].filter(
          (product: { rate: number }) =>
            product.rate >= planRate[0] && product.rate <= planRate[1],
        );
      });
      // console.log(planFilteredList, newDict);
      setPlanFilteredList(newDict);
    }
  }, [planRate]);

  // const [value, setValue] = React.useState<number[]>(rate);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPlanRate(newValue as number[]);
  };
  // console.log(maxRate);
  return (
    <Box
      sx={{
        width: 500,
        margin: '0 auto',
        paddingTop: 6.5,
      }}
    >
      <PlanRateRangeSlider
        getAriaLabel={() => 'Temperature range'}
        value={planRate}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={maxRate}
        step={1000}
        marks
        disableSwap
      />
    </Box>
  );
}
