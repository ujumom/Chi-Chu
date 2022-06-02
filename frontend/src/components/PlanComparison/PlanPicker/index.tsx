// import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Box, Button, Grid } from '@mui/material';

import PlanComparison from '../../../pages/PlanComparison';
import PlanPickerFilled from '../PlanPickerFilled';
import PlanPickerUnfilled from '../PlanPickerUnfilled';
import useCheckBoxLinked from '../../../hooks/useCheckList';
import useScrollDialog from '../../../hooks/useScrollDialog';
import { checkedPlanListState } from '../../../recoil/planComparisonState';
import { UserAge } from '../../../recoil/UserAge';
import { UserGender } from '../../../recoil/UserGender';
import { PlanPickerType } from '../../../types/types';
import { blue, grey } from '../../../styles/Colors';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';
import { CustomButtonRoot } from '../../Common/CHICHUButton/styles';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { BoldLabel } from '../../SearchResult/PlanTags/styles';

const maxNum = 3;

const getCodes = (list: PlanPickerType[]) => {
  let codes = '';
  list.forEach(item => {
    codes += item.product_code;
  });
  return codes;
};

function CustomButton(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

function PlanPicker() {
  const userAge = useRecoilValue(UserAge);
  const userGender = useRecoilValue(UserGender);
  const checkedPlanList = useRecoilValue(checkedPlanListState);

  const { resetPlanList } = useCheckBoxLinked();
  const { handleClickOpen, ScrollDialog } = useScrollDialog();
  const deselectAndResetPlanList = (list: PlanPickerType[]) => {
    list.forEach(item => {
      if (item.setChecked) {
        item.setChecked(false);
      }
    });
    resetPlanList();
  };

  return (
    <>
      <Box
        sx={{
          // paddingTop: 1,
          padding: '0.3rem 2rem 1.5rem 2rem',
          // background: `linear-gradient(${blue[200]}, transparent)`,
          // background: '#f8f8f8',
          background: '#E0ECF8',
          // background: blue[100],
          // opacity: 0.5,
          boxShadow: 'rgb(0 0 0 / 10%) 2px 2px 20px',
          borderRadius: '15px',
          width: '55rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => {
              deselectAndResetPlanList(checkedPlanList);
            }}
            // variant="contained"
            // color="secondary"
            sx={{
              marginBottom: 1,
              // padding: '5px 0',
              color: '#3399FF',
              justifyContent: 'flex-end',
            }}
          >
            {/* <BoldLabel>취소하기</BoldLabel> */}
            <CancelPresentationIcon sx={{ color: blue[900], opacity: 0.5 }} />
          </Button>
        </div>
        <Grid container spacing={2} sx={{ paddingBottom: 3 }}>
          {/* 채워진 경우의 셀들 */}
          <PlanPickerFilled list={checkedPlanList} />
          {/* 채워지지 않은 경우의 셀들 */}
          <PlanPickerUnfilled maxNum={maxNum} curNum={checkedPlanList.length} />
        </Grid>

        <CustomButton
          onClick={handleClickOpen}
          // variant="contained"
          disabled={checkedPlanList.length === 1}
        >
          보험비교 결과보기
          {/* <Link
          to="/compare"
          state={{
            age: userAge,
            gender: userGender,
            codes: getCodes(checkedPlanList),
          }}
          onClick={() => {
            deselectAndResetPlanList(checkedPlanList);
          }}
          style={{ textDecoration: 'none', color: 'white' }}
        >
          원스톱 보험비교
        </Link> */}
        </CustomButton>
      </Box>
      <ScrollDialog>
        <PlanComparison
          age={userAge as number}
          gender={userGender as number}
          codes={getCodes(checkedPlanList)}
        />
      </ScrollDialog>
    </>
  );
}

export default PlanPicker;
