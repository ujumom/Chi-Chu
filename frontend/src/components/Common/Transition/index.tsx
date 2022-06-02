/**
 * 참/거짓 값에 따라
 * 컴포넌트를 보여주거나 숨기는 애니메이션 효과
 * 기준이 되는 창은 ref prop을 통해 알려줘야 함
 * 참고: https://mui.com/components/transitions/
 */

import * as React from 'react';
import { Box, Paper, Slide } from '@mui/material';

type TransitionType = {
  component: JSX.Element;
  checked: boolean;
  containerRef: React.MutableRefObject<null>;
};

function Transition({ component, checked, containerRef }: TransitionType) {
  return (
    <Box
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, 0)',
        bottom: '10vh',
        textAlign: 'center',
      }}
    >
      <Slide
        direction="up"
        in={checked}
        container={containerRef.current}
        // 원래는 항상 렌더링되어서 다른 컴포넌트 상호작용 막았음.
        // 그래서 필요할 때만 컴포넌트가 렌더링되도록 함.
        // 성능 상 이슈가 있어서 나중에 바꿔야 함.
        mountOnEnter
        unmountOnExit
      >
        {/* 내용물이 비어있으면 순식간에 사라지는 것처럼 보임. 
            옆에 aaa 같은 더미를 붙이면 사라지는 효과가 제대로 보임 */}
        <Paper sx={{ borderRadius: 4 }}>{component}</Paper>
      </Slide>
    </Box>
  );
}

export default Transition;
