import { Suspense, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Button, Container } from '@mui/material';

// import { useLocation } from 'react-router-dom';

import Header from '../components/Common/Header';
import PlanBarList from '../components/SearchResult/PlanBarList/index';
import PlanCardList from '../components/SearchResult/PlanCardList/index';
import PlanPicker from '../components/PlanComparison/PlanPicker';
// import PlanRateRange from '../components/SearchResult/PlanRateRange';
import PlanTags from '../components/SearchResult/PlanTags';
import RelatedPlanList from '../components/SearchResult/RelatedPlanList';
// import CHICHUModal from '../components/Common/CHICHUModal';
import SecondarySearchModal from '../components/SearchResult/SecondarySearchModal';
import SortButton from '../components/SearchResult/SortButton';
import Transition from '../components/Common/Transition';
import {
  // NormalRegularText,
  NormalBoldText,
} from '../components/PlanDetail/styles';
import { PlanFilteredList } from '../recoil/PlanFilteredList';
import { planListState } from '../recoil/searchResultState';
// import { UserPeriod } from '../recoil/UserPeriod';
import { UserGender } from '../recoil/UserGender';
import { UserAge } from '../recoil/UserAge';
import useCheckBoxLinked from '../hooks/useCheckList';
import {
  ModalTitle,
  ModalTitleColor,
} from '../components/SearchResult/SecondarySearchModal/styles';
import { ProductType } from '../types/types';
// import { PlanNameLabel } from '../components/SearchResult/PlanCard/styles';
import Loading from '../components/Common/Loading';

function SearchResult(): JSX.Element {
  const containerRef = useRef(null);

  const gender = useRecoilValue(UserGender);
  const age = useRecoilValue(UserAge);
  // const planFilteredList = useRecoilValue(PlanFilteredList);

  // as 를 쓰면 타입을 강제로 선언할 수 있음.
  const planList = useRecoilValue(planListState);
  const popularList = useRecoilValue(PlanFilteredList)
    ?.popular as ProductType[];
  const reasonableList = useRecoilValue(PlanFilteredList)
    ?.reasonable as ProductType[];

  const [showMore, setShowMore] = useState(false);
  // const userPeriod = useRecoilValue(UserPeriod);
  // console.log(userPeriod);
  const { isEmptyList } = useCheckBoxLinked();

  return (
    <Box sx={{ marginBottom: isEmptyList() ? 0 : 30 }}>
      {/* Suspense는 같은 컴포넌트에서 써도 효과 있음 */}
      <Header />
      <Suspense fallback={<Loading />}>
        <Container>
          <Box
            sx={{
              paddingTop: 17,
              paddingBottom: 15,
              display: 'flex',
              flexDirection: 'column',
              // alignItems: 'center',
            }}
            ref={containerRef}
          >
            {/* <CHICHUModal
              icon={<AddAlarmIcon />}
              element={<SecondarySearch />}
            /> */}
            {/* <ModalTitle>
              {age}세 {gender == 1 ? '남성' : '여성'}기준 검색결과, 총{' '}
              {planFilteredList?.chichu.length}개의 상품을 찾았어요!
            </ModalTitle> */}
            <SecondarySearchModal />
            <PlanTags />

            {/* <PlanRateRange /> */}
            <SortButton />

            {/* 오류 회피를 위해, planList가 있을 때만 렌더링 */}
            {planList && (
              <>
                <PlanCardList list={planList.slice(0, 3)} />

                <Box textAlign="center" sx={{ margin: '20px' }}>
                  <Button onClick={() => setShowMore(cur => !cur)}>
                    {showMore ? (
                      <NormalBoldText
                        style={{
                          fontSize: '17px',
                          marginBottom: '0px',
                        }}
                      >
                        {'접기'}
                      </NormalBoldText>
                    ) : (
                      <NormalBoldText
                        style={{ fontSize: '17px', marginBottom: '0px' }}
                      >
                        {'결과 더보기'}
                      </NormalBoldText>
                    )}
                  </Button>
                </Box>
                <Box display={showMore ? 'run-in' : 'none'}>
                  <PlanBarList list={planList.slice(4)} />
                </Box>
              </>
            )}
          </Box>
        </Container>
        <Box
          sx={{
            // marginTop: '30%',
            paddingBottom: 15,
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            backgroundColor: '#f8f8f8',
          }}
        >
          <Container>
            <Box sx={{ paddingTop: '5%', paddingBottom: '2%' }}>
              {/* <ModalTitle>아직 잘 모르시겠다면</ModalTitle> */}
              {/* <Box sx={{ paddingBottom: '1%' }}>
                <ModalTitle>이런 보험은 어때요?</ModalTitle>
              </Box> */}
              <ModalTitle>
                <ModalTitleColor>
                  {age}세 {gender == 1 ? '남성' : '여성'}
                </ModalTitleColor>
                에게 인기가 많아요!
              </ModalTitle>
            </Box>
            {popularList && <RelatedPlanList list={popularList} />}
            <Box sx={{ paddingTop: '5%', paddingBottom: '2%' }}>
              {/* <ModalTitle>아직 잘 모르시겠다면</ModalTitle> */}
              <ModalTitle>합리적인 가격을 제공해요!</ModalTitle>
            </Box>
            {reasonableList && <RelatedPlanList list={reasonableList} />}
          </Container>
        </Box>

        {/* 슬라이딩 애니메이션 창 */}
        <Transition
          checked={!isEmptyList()}
          component={<PlanPicker />}
          containerRef={containerRef}
        />
      </Suspense>
    </Box>
  );
}

export default SearchResult;
