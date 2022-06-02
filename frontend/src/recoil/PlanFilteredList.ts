import { atom } from 'recoil';
import { PlanDataType, PlanListType, ProductType } from '../types/types';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const PlanFilteredList = atom<PlanDataType | undefined | PlanListType>({
  key: 'PlanFilteredList',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
