import { StylesProvider } from '@material-ui/core/styles';
import { StyledPostBox, StyledImg } from '../styles';

export function Two() {
  return (
    <StylesProvider injectFirst>
      <StyledPostBox>
        <StyledImg src="/images/tip/Post/Posts/Two/001.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/Two/002.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/Two/003.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/Two/004.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/Two/005.png" alt="이미지" />
      </StyledPostBox>
    </StylesProvider>
  );
}
