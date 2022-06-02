import React, { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { Checkbox } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';

import { checkedPlanListState } from '../recoil/planComparisonState';
import { isEmpty } from '../utils/arrayFunctions';
import { PlanPickerType } from '../types/types';

const listLimit = 3;

function useCheckBoxLinked() {
  const [checked, setChecked] = useState(false);

  const [checkedPlanList, setCheckedPlanList] =
    useRecoilState(checkedPlanListState);

  const isEmptyList = useCallback(
    () => isEmpty(checkedPlanList),
    [checkedPlanList],
  );

  const isFullList = () => {
    return checkedPlanList.length === listLimit;
  };

  const isDuplicated = (product_code_to_add: string) => {
    return checkedPlanList.some(plan => {
      return plan.product_code === product_code_to_add;
    });
  };

  const removePlan = useCallback(
    (product_code_to_delete: string) => {
      setCheckedPlanList(
        checkedPlanList.filter(
          plan => plan.product_code !== product_code_to_delete,
        ),
      );
    },
    [checkedPlanList],
  );

  const resetPlanList = useCallback(() => {
    setCheckedPlanList([]);
  }, []);

  /** 현재 체크한 상품들의 목록을 업데이트하는 함수 */
  const updateCheckedPlanList = useCallback(
    (
      e: React.MouseEvent<
        HTMLAnchorElement | HTMLButtonElement | HTMLDivElement,
        MouseEvent
      >,
      planInfo: PlanPickerType,
    ) => {
      e.preventDefault();
      if (checked === false) {
        // 가득찬 상태인 경우엔 추가 불가
        // 기존에 이미 추가된 것과 중복인 경우 추가 불가
        if (isFullList() || isDuplicated(planInfo.product_code)) {
          return;
        }
        // 체크가 안 된 상태였을 경우, 목록에 추가
        setCheckedPlanList(checkedPlanList.concat({ ...planInfo, setChecked }));
      } else {
        // 체크된 상태였을 경우, 목록에서 제거
        removePlan(planInfo.product_code);
      }
      // 체크 상태 변경
      setChecked(!checked);
    },
    [checked, checkedPlanList],
  );

  function CheckBoxLinked({ prop }: { prop: PlanPickerType }) {
    return (
      <Checkbox
        checked={checked}
        onClick={e => {
          updateCheckedPlanList(e, { ...prop });
        }}
        disabled={isFullList() || isDuplicated(prop.product_code)}
        disableRipple
        icon={<BookmarkBorder />}
        checkedIcon={<Bookmark />}
      />
    );
  }

  return {
    CheckBoxLinked,
    updateCheckedPlanList,
    removePlan,
    resetPlanList,
    isEmptyList,
  };
}

export default useCheckBoxLinked;
