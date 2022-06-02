import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CarouselCard from './Card';

const responsiveStyle = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 800 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 800, min: 500 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
};

function PostCarousel() {
  const [playing, setPlaying] = useState(true);
  const [moving, setMoving] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setPlaying(false);
      }}
      onMouseLeave={() => {
        setPlaying(true);
      }}
    >
      <Carousel
        responsive={responsiveStyle}
        // 슬라이딩 효과
        infinite={true}
        autoPlay={playing}
        autoPlaySpeed={4000}
        shouldResetAutoplay={true}
        transitionDuration={500}
        // 드래그나 스와이프 가능
        draggable={true}
        swipeable={true}
        // 움직일 때는 클릭 불가능하게
        beforeChange={() => setMoving(true)}
        afterChange={() => setMoving(false)}
        // 디자인에 관한 속성들
        arrows={true}
        showDots={true}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <CarouselCard
          text1="치아보험"
          text2="왜 들어야만 할까?"
          img="/images/tip/Post/Carousel/One.jpg"
          articlenum={1}
        />
        <CarouselCard
          text1="치아보험"
          text2="잘 고르는 법!"
          img="/images/tip/Post/Carousel/Two.jpg"
          articlenum={2}
        />
        <CarouselCard
          text1="치아질병"
          text2="예방 팁!"
          img="/images/tip/Post/Carousel/Three.jpg"
          articlenum={3}
        />
      </Carousel>
    </div>
  );
}

export default PostCarousel;
