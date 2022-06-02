// import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
  Paper,
} from '@mui/material';

import { BochulText } from '../components/PlanDetail/Option/OptionBoard/OptionGuides/BochulText';
import { BozonText } from '../components/PlanDetail/Option/OptionBoard/OptionGuides/BozonText';
import { SingyeongText } from '../components/PlanDetail/Option/OptionBoard/OptionGuides/SingyeongText';
import { ModalTitle } from '../components/SearchResult/SecondarySearchModal/styles';
import TableHeader from '../components/PlanComparison/TableHeader';
import TablePriceRow from '../components/PlanComparison/TablePriceRow';
import TableRowBarPlot from '../components/PlanComparison/TableRowBarPlot';
import TableRowGroup from '../components/PlanComparison/TableRowGroup';
import { sortComparisonResult } from '../utils/sortComparisonResult';
import { planComparisonInfoState } from '../recoil/planComparisonState';
import { NormalBoldText } from '../components/PlanDetail/styles';

type inputType = {
  age: number;
  gender: number;
  codes: string;
};

const optionGroups = [
  {
    name: '치아보철치료',
    helpContent: <BochulText />,
  },
  {
    name: '치아보존치료',
    helpContent: <BozonText />,
  },
  {
    name: '치수치료',
    helpContent: <SingyeongText />,
  },
];

function PlanComparison(input: inputType) {
  // const location = useLocation();
  // const input = location.state as inputType;
  const info = useRecoilValue(planComparisonInfoState({ ...input }));
  // console.log(info);
  const sortedInfo = sortComparisonResult(input.codes, info);

  return (
    <>
      <Typography textAlign="center">
        <NormalBoldText>보험비교 결과 ✔</NormalBoldText>
        <ModalTitle>
          {input.gender === 1 ? '남성' : '여성'} {input.age}세 기준의
          주요보장금액은 다음과 같아요
        </ModalTitle>
      </Typography>

      {info && (
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            {/* 회사 & 상품 프로필 */}
            <TableHead>
              <TableHeader companies={sortedInfo.company} />
            </TableHead>
            <TableBody>
              {/* 가격 */}
              <TablePriceRow list={sortedInfo['가격']} />

              {/* 치츄 지수 그래프 */}
              <TableRowBarPlot list={sortedInfo['치츄지수']} />

              {/* 각 담보 그룹들을 출력 */}
              {optionGroups.map(optionGroup => (
                <TableRowGroup
                  optionGroupName={optionGroup.name}
                  options={sortedInfo[optionGroup.name]}
                  helpContent={optionGroup.helpContent}
                  key={optionGroup.name}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default PlanComparison;
