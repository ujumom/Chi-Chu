import { PlanListType, PlanTagType } from '../../../types/types';
import React, { useState, useEffect } from 'react';
import sample from './sample.json';
import {
  BoldLabel,
  PlanTagButton,
  RateLabel,
  TagLabel,
  TagRateContainer,
} from './styles';

import Stack from '@mui/material/Stack';
import { useRecoilState } from 'recoil';
import { PlanListSelector } from '../../../recoil/PlanListSelector';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { PlanRateRangeSlider } from '../PlanRateRange/styles';
import Typography from '@mui/material/Typography';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

// type PropType = {
//   state?: {
//     optionName?: string | null | undefined;
//     Name_2?: string | null | undefined;
//   };
// };

type toggleList = string[];
type PlanTagButtonType = {
  plan_tag: string;
  toggleList: toggleList;
  setToggleList: React.Dispatch<React.SetStateAction<toggleList>>;
  planRate: number[];
};

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(51, 153, 255, 1)',
    color: 'white',
    maxWidth: 100,
    fontSize: theme.typography.pxToRem(13),
    fontFamily: 'NotoSansKRRegular',
    border: '1px solid #dadde9',
    borderRadius: '10px',
    // padding: '1rem',
  },
}));

const Button = ({
  plan_tag,
  toggleList,
  setToggleList,
  planRate,
}: PlanTagButtonType) => {
  const [toggle, setToggle] = useState(false);

  const [planFilteredList, setPlanFilteredList] =
    useRecoilState(PlanListSelector);
  // atom으로 따로 불러와야함
  // const plans = useRecoilValue(PlanFilteredList);
  // const plans: PlanListType = planList;
  // console.log(plans);

  // useEffect(() => {
  //   setToggleList(['아말감']);
  // }, []);

  const onChangeColor = () => {
    if (toggleList.includes(plan_tag)) {
      // 없으면
      setToggleList(toggleList.filter(el => el !== plan_tag)); //제거
      setToggle(!toggle);
    } else {
      // 있으면
      setToggleList([...toggleList, plan_tag]); // 넣어줌
      setToggle(!toggle);
    }
  };

  useEffect(() => {
    // console.log(toggleList);
    // toggleList에 있는 tag만 포함된 planTaggedList로 filtering 반환
    let toggledListCopy = toggleList;
    function checkTagged(option: string) {
      // console.log(option);
      if (toggledListCopy.length == 0) {
        // console.log(option, '성공인디');
        toggledListCopy = toggleList;
        return true;
      }
      if (toggledListCopy.includes(option)) {
        toggledListCopy = toggledListCopy.filter(element => element !== option);
        // console.log(option, toggledListCopy);
      }
    }

    if (planFilteredList) {
      // console.log(toggleList);
      const newDict: PlanListType = { ...planFilteredList };
      newDict['cheap'] = planFilteredList.cheap.filter(
        product =>
          product.option_name.some(checkTagged) &&
          product.rate >= planRate[0] &&
          product.rate <= planRate[1],
      );
      // const newList = planFilteredList.cheap.filter(product =>
      //   product.option_name.some(checkTagged),
      // );
      newDict['chichu'] = planFilteredList.chichu.filter(
        product =>
          product.option_name.some(checkTagged) &&
          product.rate >= planRate[0] &&
          product.rate <= planRate[1],
      );
      // newDict['popular'] = planFilteredList.popular.filter(product =>
      //   product.option_name.some(checkTagged),
      // );
      newDict['coverage'] = planFilteredList.coverage.filter(
        product =>
          product.option_name.some(checkTagged) &&
          product.rate >= planRate[0] &&
          product.rate <= planRate[1],
      );
      // newDict['reasonable'] = planFilteredList.reasonable.filter(product =>
      //   product.option_name.some(checkTagged),
      // );
      // console.log(planFilteredList, newDict);
      setPlanFilteredList(newDict);
    }
  }, [toggleList, planRate]);

  return (
    <PlanTagButton
      // id={String(id)}
      onClick={onChangeColor}
      istag={toggleList.includes(plan_tag) ? 'true' : null}
    >
      {plan_tag}
    </PlanTagButton>
  );
};

function PlanTags() {
  const tagList: PlanTagType[] = sample;
  const [toggleList, setToggleList] = useState<toggleList>([]);
  const [planFilteredList, setPlanFilteredList] =
    useRecoilState(PlanListSelector);
  const [planRate, setPlanRate] = React.useState([0, 0]);
  const [maxRate, setMaxRate] = React.useState(0);
  const planRateLst: any = [];

  useEffect(() => {
    planFilteredList?.cheap.map(product => planRateLst.push(product.rate));
    // console.log(planRateLst);
    setPlanRate([0, Math.max(...planRateLst)]);
    setMaxRate(Math.max(...planRateLst));
    // setToggleList([...toggleList, '틀니']);
    // console.log(toggleList);

    // 1. 새로고침 했을 때 state 가 사라지게 하는 것.(원래 상태로 돌아오게 하는 것)
    // setToggleList([...toggleList, '틀니']);

    // 2. (원래 상태로 돌아오게 하는 것)
  }, []);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setPlanRate(newValue as number[]);
  };

  return (
    <TagRateContainer>
      {/* <Divider /> */}
      <Divider>
        <RateLabel>
          원하시는 <BoldLabel>월 납입금액</BoldLabel>의 범위를 지정해보세요
        </RateLabel>
      </Divider>
      <Box
        sx={{
          width: 800,
          margin: '0 auto',
          paddingTop: 3,
          paddingBottom: 3,
        }}
      >
        <PlanRateRangeSlider
          value={planRate}
          onChange={handleChange}
          // getAriaValueText={valuetext}
          min={0}
          max={maxRate}
          step={1000}
          disableSwap
          valueLabelDisplay="on"
          marks
        />
      </Box>
      {/* <Divider /> */}
      <Divider>
        <TagLabel>
          보장받고 싶은 <BoldLabel>담보</BoldLabel>를 선택해보세요
          <IconButton>
            <Link to="/tip">
              <HtmlTooltip
                placement="right"
                title={
                  <React.Fragment>{<span>담보가이드</span>}</React.Fragment>
                }
              >
                <HelpOutlineIcon
                  color="disabled"
                  sx={{
                    fontSize: 20,
                    cursor: 'pointer',
                    marginBottom: '2px',
                    color: 'grey',
                  }}
                />
              </HtmlTooltip>
            </Link>
          </IconButton>
        </TagLabel>
      </Divider>
      <Box
        sx={{
          // width: 500,
          // margin: '0 auto',
          paddingTop: 3,
          paddingBottom: 8,
        }}
      >
        <Stack spacing={2} direction="row">
          {tagList.map(tag => (
            <Button
              key={tag.id}
              plan_tag={tag.plan_tag}
              toggleList={toggleList}
              setToggleList={setToggleList}
              planRate={planRate}
            />
          ))}
        </Stack>
      </Box>
    </TagRateContainer>
  );
}

export default PlanTags;
