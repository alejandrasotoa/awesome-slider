import styled, { css } from 'styled-components';

const indexSize = 20;
const indicatorSize = indexSize / 2;
const initialPosition = (indexSize - indicatorSize) / 2;

export const Container = styled.div`
  scroll-behavior: smooth;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
`;
Container.displayName = 'Container';

const Slide = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 32px;
  background: ${(props) => props.background};
`;

export const ActiveSlide = styled.div`
  ${Slide};
  position: absolute;
  top: 0;
  left: 0;
  animation-name: ${(props) => (props.slideDirection === 'down' ? 'slide-down' : 'slide-up')};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;

  @keyframes slide-down {
    0% {
      top: 100%;
    }
    100% {
      top: 0;
    }
  }

  @keyframes slide-up {
    0% {
      top: -100%;
    }
    100% {
      top: 0;
    }
  }
`;
ActiveSlide.displayName = 'ActiveSlide';

export const InactiveSlide = styled.div`
  ${Slide};
`;
InactiveSlide.displayName = 'InactiveSlide';

export const TextContainer = styled.h1`
  width: 50%;
  font-size: 24px;

  @media all and (max-width: 768px) {
    font-size: 20px;
  }
`;
TextContainer.displayName = 'TextContainer';

export const Index = styled.ul`
  position: fixed;
  transform: translateY(-50%);
  top: 50%;
  right: 12px;
  list-style: none;
  display: flex;
  flex-direction: column;
`;
Index.displayName = 'Index';

export const Item = styled.li`
  width: ${indexSize}px;
  height: ${indexSize}px;
  margin-top: ${indexSize}px;
  background: black;

  &:first-of-type {
    margin-top: 0;
  }
`;
Item.displayName = 'Item';

export const Indicator = styled.div`
  position: absolute;
  border: 1px solid black;
  top: ${(props) => props.activeSlide * (indexSize * 2)}px;
  left: ${initialPosition}px;
  width: ${indicatorSize}px;
  height: ${indicatorSize}px;
  background: ${(props) => props.color};
  animation-name: ${(props) => (props.slideDirection === 'down' ? 'index-down' : 'index-up')};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;

  @keyframes index-down {
    0% {
      transform: translateY(-${initialPosition + (indexSize + indicatorSize)}px);
    }
    100% {
      transform: translateY(${initialPosition}px);
    }
  }

  @keyframes index-up {
    0% {
      transform: translateY(${initialPosition + (indexSize + indicatorSize)}px);
    }
    100% {
      transform: translateY(${initialPosition}px);
    }
  }
`;
Indicator.displayName = 'Indicator';
