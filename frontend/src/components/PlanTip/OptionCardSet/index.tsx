import React from 'react';
import OptionCardList from './OptionCardList';

function OptionCards() {
  const list = [
    {
      name: '임플란트',
      name2: '틀니',
      description:
        '임플란트는 잇몸에 인공치아를 삽입하는 것이고, \n틀니는 수술 없이 입에 \n껴서 사용합니다.',
      symptom: '나이가 들어서 치아가 \n많이 빠졌어요',
      image: '/images/tip/TipCards/1.png',
    },
    {
      name: '신경치료',
      description:
        '치아의 깊은 곳의 신경이 \n균에 감염되면 치아가 \n시리고 아프게 됩니다. \n이 때 신경을 제거하고 \n다른 재료로 채워넣는 \n신경치료를 진행합니다.',
      symptom: '이가 시리고 아파요!',
      image: '/images/tip/TipCards/2.png',
    },
    {
      name: '잇몸질환',
      description:
        '잇몸은 이를 단단히 \n잡아주는 받침대죠! \n잇몸질환은 치아 상실의 원인이 될 수 있으니 \n미리 예방하고 치료해야 합니다.',
      symptom: '잇몸이 붓고 \n아파요!\n',
      image: '/images/tip/TipCards/3.png',
    },
    {
      name: '치아골절',
      description:
        '치아에 금이 가거나 \n부러진 상태예요. \n치아의 골절은 파절\n이라고도 부릅니다!',
      symptom: '치아에 금이 갔어요!\n\n',
      image: '/images/tip/TipCards/4.png',
    },
    {
      name: '스케일링',
      description:
        '스케일링은 치석을 \n제거하고 치아를 \n깨끗이 하는 치료입니다.',
      symptom: `주기적으로 치석을 \n제거하고 싶어요!`,
      image: '/images/tip/TipCards/5.png',
    },
    {
      name: '치조골 이식수술',
      description:
        '임플란트를 할 때, 인공\n치아를 단단히 받쳐줄 \n잇몸뼈가 필요한데 \n이것이 부족할 때 하는 \n수술입니다.',
      symptom: '임플란트 할 \n잇몸뼈가 부족해요.',
      image: '/images/tip/TipCards/6.png',
    },
    {
      name: '레진',
      description:
        '충치로 깎아낸 치아의 빈 부분을 채우는 소재 중 \n하나입니다. 치아색과 \n유사해 많은 사람들이 \n사용합니다.',
      symptom: '치아를 티 안 나게 \n떼우고 싶어요.',
      image: '/images/tip/TipCards/7.png',
    },
    {
      name: '충전치료',
      description:
        '충치가 생겼을 때는, \n충치가 걸린 부분을 깎고, \n빈 부분을 채우는 \n충전치료를 하게 됩니다.',
      symptom: '충치가 생겼어요!\n\n',
      image: '/images/tip/TipCards/8.png',
    },
  ];
  return (
    <>
      <OptionCardList list={list} />
    </>
  );
}

export default OptionCards;
