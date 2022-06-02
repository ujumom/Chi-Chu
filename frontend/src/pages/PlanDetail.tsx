import React, { Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { UserGender } from '../recoil/UserGender';
import { UserAge } from '../recoil/UserAge';
import { Box, Button, Typography } from '@mui/material';
import CompanyIndexModal from '../components/PlanDetail/Modal/CompanyIndexModal/index';
import ProductIndexModal from '../components/PlanDetail/Modal/ProductIndexModal/index';
import UserIndexModal from '../components/PlanDetail/Modal/UserIndexModal/index';
import { OptionBoard } from '../components/PlanDetail/Option/OptionBoard/index';
import { OptionDetailBoard } from '../components/PlanDetail/Option/OptionDetailBoard/index';
import CompanyProfile from '../components/PlanDetail/CompanyProfile';
import QuestionTooltip from '../components/PlanDetail/QuestionTooltip';
import DetailSample from '../components/PlanDetail/DetailSample.json';
import { PieChart } from '../components/PlanDetail/PieChart/index';
import { RadarChart } from '../components/PlanDetail/RadarChart/index';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';
import RightBox from '../components/PlanDetail/RightBox';
import {
  Board,
  OptionBoxButton,
  GreyRegularText,
  NormalRegularText,
  NormalBoldText,
} from '../components/PlanDetail/styles';
import Header from '../components/Common/Header';
import ProgressBar from '../components/PlanDetail/ProgressBar';
import IndexBox from '../components/PlanDetail/IndexBox';
import { StylesProvider } from '@material-ui/core/styles';
import { textAlign } from '@mui/system';
import RelatedPlanList from '../components/SearchResult/RelatedPlanList';
import { PlanFilteredList } from '../recoil/PlanFilteredList';
import { ProductType } from '../types/types';
import {
  ModalTitle,
  ModalTitleColor,
} from '../components/SearchResult/SecondarySearchModal/styles';

import CircularProgress from '@mui/material/CircularProgress';
import Loading from '../components/Common/Loading';

interface CustomState {
  [x: string]: any;
  state: {
    product_code: string;
  };
}

type InfoType = {
  age_rage: { AGE_CAT: number; RATE: string }[];
  base: {
    AGE: number;
    COMPANY_CODE: string;
    COMPANY_INDEX: number;
    COMPANY_NAME: string;
    GENDER: string;
    PRODUCT_CODE: string;
    PRODUCT_INDEX: number;
    PRODUCT_NAME: string;
    PY: number;
    RATE: number;
    TOTAL_INDEX: number;
    USER_INDEX: number;
  };
  option: {
    NAME: string;
    COVERAGE: number;
  }[];
  option_column: { ID: string; OPTION_NAME: string }[];
  option_detail: { NAME: string; COVERAGE: number }[];
  option_group: { NAME: string; COVERAGE: number; RATE: number }[];
};

function PlanDetail() {
  const popularList = useRecoilValue(PlanFilteredList)
    ?.popular as ProductType[];
  const reasonableList = useRecoilValue(PlanFilteredList)
    ?.reasonable as ProductType[];

  const location = useLocation();
  const state = location.state as CustomState;
  // console.log(state);
  // console.log(document.referrer, window.location.href);
  const userAge = useRecoilValue(UserAge);
  const userGender = useRecoilValue(UserGender);

  const [showMore, setShowMore] = useState(false);
  const [info, setInfo] = useState<InfoType | null>(null);

  const getProductInfo = () => {
    const credentials = {
      age: userAge,
      gender: userGender,
      product_code: state.product_code,
      py: state.py,
    };
    axios
      .get(
        `/product/${credentials.product_code}/${credentials.age}/${credentials.gender}/${credentials.py}`,
      )
      .then(res => {
        setInfo(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        // console.log(err);
      });
  };

  useEffect(() => {
    // console.log(userAge, userGender, state.py, state.product_code);
    getProductInfo();
  }, []);

  useEffect(() => {
    // console.log(document.referrer, window.location.href);
    if (document.referrer != window.location.href) {
      window.location.reload();
      // console.log(state.product_code, 'reload');
    }
  }, [state]);

  //안들어왔을 때는 로딩 떠있도록.
  if (!info) {
    return (
      // <>
      //   <CircularProgress
      //     disableShrink={true}
      //     size={120}
      //     thickness={2}
      //     sx={{
      //       marginTop: '40vh',
      //       marginLeft: '50vw',
      //     }}
      //   />
      // </>
      <Loading />
    );
  } else {
    return (
      <>
        <Header />
        <Board>
          <Container maxWidth="md">
            <Box
              sx={{
                paddingTop: 15,
                textAlign: 'left',
                maxWidth: '70vw',
              }}
            >
              <CompanyProfile
                company_name={info.base[0]['COMPANY_NAME']}
                product_name={info.base[0]['PRODUCT_NAME']}
              />
            </Box>
            <ProgressBar
              plan_score={info.base[0]['TOTAL_INDEX']}
              plan_average={52.64}
            />
            <IndexBox
              CompanyIndex={info.base[0]['COMPANY_INDEX']}
              ProductIndex={info.base[0]['PRODUCT_INDEX']}
              UserIndex={info.base[0]['USER_INDEX']}
            />
            <br />

            <OptionBoard option={info['option']} />
            <Box sx={{ marginBottom: '10px', textAlign: 'center' }}>
              <Button
                onClick={() => setShowMore(cur => !cur)}
                style={{
                  padding: '10px',
                }}
              >
                {showMore ? (
                  <NormalBoldText
                    style={{
                      fontSize: '16px',
                      // paddingLeft: '40px',
                      alignItems: 'center',
                      marginBottom: '0px',
                    }}
                  >
                    {'접기'}
                  </NormalBoldText>
                ) : (
                  <NormalBoldText
                    style={{ fontSize: '16px', marginBottom: '0px' }}
                  >
                    {'보장 자세히 보기'}
                  </NormalBoldText>
                )}
                {showMore ? (
                  <ArrowDropUpIcon
                    sx={{
                      marginTop: '0px',
                      // paddingRight: '30px'
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </Button>
            </Box>

            {showMore && (
              <OptionDetailBoard option_detail={info['option_detail']} />
            )}
            <br />
            <GreyRegularText
              style={{
                textAlign: 'left',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              보험 가입자 연령 분포
            </GreyRegularText>
            <PieChart age_rate={info['age_rate']} />
            <br />
            <GreyRegularText
              style={{ textAlign: 'left', marginBottom: '10px' }}
            >
              주력 보장치료
            </GreyRegularText>
            <RadarChart option_group={info['option_group']} />
            <br />
          </Container>
          <div>
            <RightBox
              gender={userGender ? userGender : 0}
              age={userAge ? userAge : 0}
              rate={info.base[0]['RATE']}
              py={info.base[0]['PY']}
              link={info.base[0]['PRODUCT_LINK']}
            ></RightBox>
          </div>
        </Board>

        <Box
          sx={{
            marginTop: '30%',
            paddingBottom: 15,
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            backgroundColor: '#f8f8f8',
          }}
        >
          <Container>
            <Box sx={{ paddingTop: '5%', paddingBottom: '2%' }}>
              {/* <Box sx={{ paddingBottom: '1%', fontFamily: 'NotoSansKRBold' }}>
                <ModalTitle>이런 보험은 어때요?</ModalTitle>
              </Box> */}
              <br />
              <ModalTitle>
                <ModalTitleColor>
                  {userAge}세 {userGender == 1 ? '남성' : '여성'}
                </ModalTitleColor>
                에게 인기가 많아요!
              </ModalTitle>
            </Box>
            {popularList ? (
              <RelatedPlanList list={popularList && popularList} />
            ) : null}

            <Box sx={{ paddingTop: '5%', paddingBottom: '2%' }}>
              <ModalTitle>합리적인 가격을 제공해요!</ModalTitle>
            </Box>
            {reasonableList ? (
              <RelatedPlanList list={reasonableList && reasonableList} />
            ) : null}
          </Container>
        </Box>
      </>
    );
  }
}

export default PlanDetail;
