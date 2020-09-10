// vendor
import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

// styled
import {
  Container,
  ActiveSlide,
  InactiveSlide,
  TextContainer,
  Index,
  Item,
  Indicator,
} from './verticalSlider.styled';

let activeSlideState;

const VerticalSlider = ({ slides }) => {
  const [activeSlide, setActiveSlide] = useState({ slide: 0, direction: 'down' });
  activeSlideState = activeSlide.slide;
  const slideUp = () => {
    setActiveSlide((prevState) => ({ slide: prevState.slide - 1, direction: 'up' }));
  };
  const slideDown = () => {
    setActiveSlide((prevState) => ({ slide: prevState.slide + 1, direction: 'down' }));
  };

  const debounceSlide = useCallback(
    debounce(slideUp, 50, { leading: true, trailing: false }),
  );

  const debounceSlideDown = useCallback(
    debounce(slideDown, 50, { leading: true, trailing: false }),
  );

  const handleSlideChange = (e) => {
    if (activeSlideState < slides.length - 1 && e.deltaY > 0) {
      debounceSlideDown();
    } else if (activeSlideState > 0 && e.deltaY < 0) {
      debounceSlide();
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleSlideChange);
    return () => window.removeEventListener('wheel', handleSlideChange);
  }, []);

  const buildActiveSlide = (slide) => (
    <ActiveSlide
      key={`slide-${slide.id}`}
      background={slide.background}
      activeSlideIndex={activeSlide.slide}
      slideDirection={activeSlide.direction}
    >
      <TextContainer>{slide.text}</TextContainer>
    </ActiveSlide>
  );

  const buildInactiveSlide = (slide) => (
    <InactiveSlide key={`slide-${slide.id}`} background={slide.background}>
      <TextContainer>{slide.text}</TextContainer>
    </InactiveSlide>
  );

  const buildPaginator = () => (
    <Index>
      {slides.map((item) => (
        <Item key={`paginator-${item.id}`} />
      ))}
      <Indicator
        key={`index-paginator-${activeSlide.slide}`}
        color={slides[activeSlide.slide].background}
        activeSlide={activeSlide.slide}
        slideDirection={activeSlide.direction}
      />
    </Index>
  );

  const buildBaseSlider = () => {
    let baseSlider = null;
    if (activeSlide.direction === 'down' && activeSlide.slide > 0) {
      baseSlider = buildInactiveSlide(slides[activeSlide.slide - 1]);
    } else if (activeSlide.direction === 'up' && activeSlide.slide < slides.length - 1) {
      baseSlider = buildInactiveSlide(slides[activeSlide.slide + 1]);
    }

    return baseSlider;
  };

  return (
    <Container>
      {buildActiveSlide(slides[activeSlide.slide])}
      {buildBaseSlider()}
      {buildPaginator()}
    </Container>
  );
};

export default VerticalSlider;
