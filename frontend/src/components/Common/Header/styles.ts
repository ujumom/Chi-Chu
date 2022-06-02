import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { blue } from '../../../styles/Colors';

export const HeaderContainer = styled.div<{
  isScrollBackground: boolean;
  isScrollShadow: boolean;
  isScrollTransition: boolean;
}>`
  display: flex;
  align-items: center;
  // justify-content: space-between;
  position: fixed;
  z-index: 10;
  transition: ${({ isScrollTransition }) =>
    isScrollTransition ? 'all 0.2s ease-in' : 'none'};
  width: 100%;
  height: 72px;
  padding: 0 32px;
  background-color: ${({ isScrollBackground }) =>
    isScrollBackground ? '#fff' : 'none'};
  box-shadow: ${({ isScrollShadow }) =>
    isScrollShadow ? '0px 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const LogoWrapper = styled(Link)<{
  isscrollbackground: string | undefined;
}>`
  margin-top: 4px;
  font-family: 'FredokaOneRegular';
  font-size: 26px;
  // color: #fff;
  color: ${({ isscrollbackground }) =>
    isscrollbackground ? blue[400] : blue[100]};
  text-decoration: none;
  // text-shadow: -1px 0 ${blue[400]}, 0 1px ${blue[400]}, 1px 0 ${blue[400]},
  // 0 -1px ${blue[400]};
`;

export const HeaderRight = styled.div`
  // margin-left: 2rem;
  display: flex;
  align-items: center;
`;

export const initialFont = styled.div`
  font-family: 'NotoSansKRBold';
  font-size: 15px;
  color: #000;
  text-decoration: none;
`;

export const Nav = styled(initialFont)`
  display: flex;
  align-items: center;
  padding-right: 30px;
  & > a {
    display: block;
    position: relative;
    color: #2e2e2e;
    margin-left: 70px;
  }
  & > a::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -4px;
  }
  & > a::after {
    width: 0;
    height: 3px;
    background: ${blue[200]};
    left: 50%;
  }
  & > a:hover::after {
    width: 100%;
    left: 0;
    transition: all 0.3s;
  }
`;

export const NavWrapper = styled(Link)`
  font-family: 'NotoSansKRMedium';
  font-size: 18px;
  color: #2e2e2e;
  text-decoration: none;
`;
