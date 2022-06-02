import { StylesProvider } from '@material-ui/core/styles';
import { StyledPostBox, StyledImg } from '../styles';

export function Three() {
  return (
    <StylesProvider injectFirst>
      <StyledPostBox>
        <StyledImg src="/images/tip/Post/Posts/Three/001.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/Three/002.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/Three/003.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/Three/004.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/Three/005.png" alt="이미지" />
        <StyledImg src="/images/tip/Post/Posts/Three/006.png" alt="이미지" />
      </StyledPostBox>
    </StylesProvider>
  );
}
