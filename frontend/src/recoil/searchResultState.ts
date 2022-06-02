import { atom, selector } from 'recoil';

import { PlanFilteredList } from './PlanFilteredList';
import { ProductType } from '../types/types';

export const sortByState = atom({
  key: 'sortByState',
  default: 'chichu',
});

export const planListState = selector<ProductType[]>({
  key: 'planListState',
  get: ({ get }) => {
    const sortBy = get(sortByState);
    const planLists = get(PlanFilteredList);
    if (planLists) {
      return planLists[sortBy];
    }
  },
});
