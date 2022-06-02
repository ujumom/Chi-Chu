import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { UserGender } from '../../../recoil/UserGender';
import { UserAge } from '../../../recoil/UserAge';
import { CustomButtonRoot } from '../../Common/CHICHUButton/styles';
import { PlanListSelector } from '../../../recoil/PlanListSelector';

function CustomButton(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

function Button() {
  const navigate = useNavigate();
  const userAge = useRecoilValue(UserAge);
  const userGender = useRecoilValue(UserGender);
  // console.log(userAge, userGender);

  const planListSelector = useResetRecoilState(PlanListSelector);

  const handleClick = () => {
    // 납입기간 초기화
    planListSelector();
    navigate('result', { replace: false });
  };
  return (
    <Stack spacing={2} direction="row" sx={{ marginTop: 3 }}>
      <CustomButton
        disabled={userAge && userGender != null ? false : true}
        onClick={handleClick}
      >
        보험 찾아보기
      </CustomButton>
    </Stack>
  );
}
export default Button;
