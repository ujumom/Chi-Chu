import styled, { keyframes } from 'styled-components';
import { blue } from '../../../styles/Colors';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

export const Background = styled.img`
  width: 100%;
  height: 100vh;
  // background-image: url('/images/randing/background.png');
  // background-size: cover;
  z-index: 0;
  position: absolute;
`;

export const ChiChu = styled.img`
  // z-index: 2;
  position: absolute;
  width: 75%;
  right: -15%;
  margin-top: 4.2rem;
  // left: 2%
  // filter: drop-shadow(1px 1px 0 white) drop-shadow(-1px 1px 0 white);
`;

const float = keyframes`
    0% {
      box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
      transform: translate(0,  0px);
    }
    50% {
      box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
      transform: translate(0, -20px);
    }
    100% {
      box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
      transform: translate(0, 0px);
    }
`;

const focus = keyframes`
    0% {
      filter:blur(12px);opacity:0
    }
    100% {
      filter:blur(0);opacity:1
    }
`;

const jello = keyframes`
    0% {
      transform:scale3d(1,1,1);
      opacity:0
    }
    30% {
      transform:scale3d(1.25,.75,1)
    }
    40% {
      transform:scale3d(.75,1.25,1)
    }
    50% {
      transform:scale3d(1.15,.85,1)
    }
    65% {
      transform:scale3d(.95,1.05,1)
    }
    75% {
      transform:scale3d(1.05,.95,1)
    }
    100% {
      transform:scale3d(1,1,1)
    }
`;

export const ChiChuAnimation = styled.div`
  // z-index: 2;
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
  transform: translate(0px);
  // position: absolute;
  animation: ${float} 3s ease-in-out infinite;
`;

export const ContentDiv = styled.div`
  position: absolute;
  top: 30%;
  left: 8%;
`;

export const Title = styled.b`
  font-size: 7rem;
  color: #fff;
  color: ${blue[100]};
  // text-shadow: -1px 0 ${blue[400]}, 0 1px ${blue[400]}, 1px 0 ${blue[400]},
  //   0 -1px ${blue[400]};
  font-family: FredokaOneRegular;
  animation: ${focus} 0.4s cubic-bezier(0.55, 0.85, 0.68, 0.53) both;
`;

export const TitleSmall = styled(Title)`
  font-size: 4rem;
`;

export const Content = styled.p`
  font-size: 2.5rem;
  color: #fff;
  font-family: NotoSansKRBold;
  margin: 0;
  animation: ${focus} 0.3s cubic-bezier(0.55, 0.85, 0.68, 0.53) both;
  animation-delay: 0.7s;
`;

export const ChichuColor = styled.span`
  color: ${blue[100]};
  font-family: NotoSansKRBold;
  text-shadow: -1px 0 ${blue[400]}, 0 1px ${blue[400]}, 1px 0 ${blue[400]},
    0 -1px ${blue[400]};
`;

export const CustomBannerButtonRoot = styled('button')`
  animation: ${jello} 0.9s both;
  animation-delay: 1.5s;
  margin: 20px 10px;
  position: absolute;
  font-family: NotoSansKRBold;
  font-weight: bold;
  font-size: 1.5rem;
  background-color: ${blue[500]};
  padding: 13px 25px;
  border-radius: 100px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
