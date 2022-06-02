import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const UserPeriod = atom<number | null>({
  key: 'UserPeriod',
  default: 10,
  effects_UNSTABLE: [persistAtom],
});
