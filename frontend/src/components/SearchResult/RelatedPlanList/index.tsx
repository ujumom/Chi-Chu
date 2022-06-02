// 참고: https://www.npmjs.com/package/react-multi-carousel

import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Card from '../PlanCard';
import { ProductType } from '../../../types/types';

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

function RelatedPlanList({ list }: { list: ProductType[] }) {
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
        {list.map(content => (
          <Card content={{ ...content, moving }} key={content.product_code} />
        ))}
      </Carousel>
    </div>
  );
}

export default RelatedPlanList;
