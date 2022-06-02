import { StylesProvider } from '@material-ui/core/styles';
import { StyledPostBox, StyledImg } from '../styles';

export function One() {
  return (
    <StylesProvider injectFirst>
      <StyledPostBox>
        <StyledImg src="/images/tip/Post/Posts/One/001.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/One/002.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/One/003.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/One/004.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/One/005.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/One/006.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/One/007.png" alt="이미지" />
      </StyledPostBox>
    </StylesProvider>
  );
}
