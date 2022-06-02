import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const UserGender = atom<number | null>({
  key: 'UserGender',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
