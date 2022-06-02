import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const UserAge = atom<number | null>({
  key: 'UserAge',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// 뒤로가기해도 그대로 보일 수 있게
export const UserBirthDate = atom<
  string | number | readonly string[] | undefined
>({
  key: 'UserBirthDate',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
