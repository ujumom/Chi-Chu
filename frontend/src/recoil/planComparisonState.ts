import axios from 'axios';
import { atom, selectorFamily } from 'recoil';

import { PlanPickerType, ComparisonTableType } from '../types/types';

type paramType = {
  age: number;
  gender: number;
  codes: string;
};

export const checkedPlanListState = atom<PlanPickerType[]>({
  key: 'checkedPlanListState',
  default: [],
});

export const planComparisonInfoState = selectorFamily<
  ComparisonTableType,
  paramType
>({
  key: 'planComparisonInfoState',
  get:
    ({ age, gender, codes }) =>
    async () => {
      const response = await axios.get(`/compare/${age}/${gender}/${codes}`);
      const data = await response.data;
      return data;
    },
});
