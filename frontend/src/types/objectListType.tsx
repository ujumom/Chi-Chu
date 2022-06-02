import objectSample from './objectSample.json';

function ParentComponent() {
  const objectSampleList = objectSample;

  return (
    <>
      {/* 부모 컴포넌트에서 자식 컴포넌트로 전달 */}
      <ChildComponent sample={objectSampleList} />
    </>
  );
}

// 자식 컴포넌트의 타입은 다음과 같이 선언
// 파일 안에 들은 모든 key값과 type을 선언
// 안에 객체(오브젝트)가 있으면 똑같이 key값과 내부 객체까지 전부 선언
type PropType = {
  sample: {
    option: {
      denture: { crown: number; bridge: number };
      reserve: { amalgam: number; gold: number };
    };
  }[];
};

// 자식 컴포넌트에서 prop과 타입을 일치시키기
// 이제 prop 내부를 참조할 수 있다!
function ChildComponent({ sample }: PropType) {
  console.log(sample[0].option.denture.bridge);

  return <></>;
}

export default ParentComponent;
