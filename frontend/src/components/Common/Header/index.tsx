import React from 'react';
import {
  HeaderContainer,
  HeaderRight,
  LogoWrapper,
  Nav,
  NavWrapper,
} from './styles';

interface Props {
  isScrollBackground: boolean;
  isScrollShadow: boolean;
  isScrollTransition: boolean;
}

const Header = ({
  isScrollBackground,
  isScrollShadow,
  isScrollTransition,
}: Props) => {
  return (
    <>
      <HeaderContainer
        isScrollBackground={isScrollBackground}
        isScrollShadow={isScrollShadow}
        isScrollTransition={isScrollTransition}
      >
        <LogoWrapper
          to="/"
          isscrollbackground={
            isScrollBackground ? isScrollBackground.toString() : undefined
          }
        >
          Chi Chu
        </LogoWrapper>
        <HeaderRight>
          <Nav>
            <NavWrapper to="/search">보험검색</NavWrapper>
            <NavWrapper to="/tip">보험TIP</NavWrapper>
            <NavWrapper to="/about">AboutUS</NavWrapper>
          </Nav>
        </HeaderRight>
      </HeaderContainer>
      {/* <HeaderResponsive /> */}
    </>
  );
};
export default Header;

Header.defaultProps = {
  isScrollBackground: 'false',
  isScrollShadow: 'false',
  isScrollTransition: 'false',
};
