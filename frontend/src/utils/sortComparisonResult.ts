import { ComparisonTableType, ComparisonTableRowType } from '../types/types';
import { range } from './arrayFunctions';

/** 문자열에서 특정 문자의 개수를 구하는 함수 */
export const getCount = (str: string, sep: string) => str.split(sep).length - 1;

/**
 * {상품 코드: 테이블 내 위치}를 담은 객체 반환 함수
 *
 * 상품 코드의 문자열을 각각의 상품 코드로 쪼갠 후,
 * 각 상품 코드가 상품 비교 테이블에서
 * 몇 번째 열에 해당하는지를 객체로 반환
 *
 * 예시) getPositionDict('E10020E10001E10003', 3, 6)
 * 반환) {E10020: 0, E10001: 1, E10003: 2}
 * */
const getPositionDict = (codes: string, count: number, step: number) => {
  // 반환할 임시 오브젝트
  const positionDict = {};
  // 상품 개수만큼의 크기를 갖는 배열을 생성한 후
  range(count).forEach(index => {
    // 상품 코드들의 문자영을 슬라이싱하여,
    // 각각의 상품 코드를 추출함.
    const code = codes.slice(index * step, index * step + step);
    // 추출한 상품 코드를 key로 하여 객체에 넣고,
    // value로는 그 상품이 테이블에서 몇 번째 열에 위치하는지를 넣어줌.
    positionDict[code] = index;
  });
  return positionDict;
};

/**
 * 배열을 정렬하는 함수
 * 정렬 기준은 상품 비교 시 유저가 선택한 순서대로임.
 *
 * 단, 상품 코드의 위치가 경우에 따라 달라지므로,
 * 유동적으로 바꿀 수 있게 함수 형태로 구성
 */
const sortByPosition = <T>(list: Array<T>, positionDict: object) => {
  let newList = [];

  // 기존 리스트를 정렬
  newList = list.slice().sort((a, b) => {
    // 오름차순 정렬을 위해,
    // 앞이 뒤에보다 작으면 음수를 반환하여 앞쪽에 오도록 함.
    return positionDict[a['product_code']] < positionDict[b['product_code']]
      ? -1
      : positionDict[a['product_code']] > positionDict[b['product_code']]
      ? 1
      : 0;
  });
  return newList;
};

/**
 * 기존 객체에서 빈 부분을 채워 반환하는 함수
 *
 * 객체의 직접적인 수정은 불가능. 그러므로,
 * 1. 기존 객체와 같은 크기의 빈 배열을 만들고,
 * 2. 이 배열의 맞는 위치에 값을 채운 후,
 * 3. 기존 객체와 이 배열들을 합친 새로운 객체를 반환
 * */
const fillCoverageByZero = (
  list: ComparisonTableRowType[],
  count: number,
  positionDict: object,
) => {
  // 상품 코드들 (E10001, E10020 등)
  const products = Object.keys(positionDict);

  // 수정된 객체들을 포함한 새로운 리스트 반환
  // 객체들 반환을 위해 map 메서드를 썼음.
  const newList = list.map(option => {
    // 상품 개수만큼의 빈 배열을 만듦
    const product_code = Array(count).fill('');
    const coverage = Array(count).fill('');

    // 상품 코드들을 포함하는지 순회하며 검사
    products.forEach(product => {
      // 현재 상품의 올바른 위치를 찾아, 해당 위치에 상품 코드 넣기
      const correctIndex = positionDict[product];
      product_code[correctIndex] = product;

      // 상품 코드가 있는 경우, 보장 금액의 위치도 맞게 넣어주기
      if (option.product_code.includes(product)) {
        const givenIndex = option.product_code.indexOf(product);
        coverage[correctIndex] = option.coverage[givenIndex];
      } else {
        // 상품 코드가 없는 경우, 보장 금액은 0으로 채우기
        coverage[correctIndex] = '0';
      }
    });

    // 기존 객체는 스프레드를 하고,
    // 임시 변수를 추가해서 새로운 객체를 만들어 반환
    const newObj = { ...option, product_code, coverage };
    return newObj;
  });

  return newList;
};

/**
 * 상품 비교 API 응답 결과를
 * 유저가 선택한 순서대로 정렬하면서
 * 보장 금액이 빈 부분을 채우는 함수
 */
export const sortComparisonResult = (
  codes: string,
  tableInfo: ComparisonTableType,
) => {
  const newTableInfo = Object();
  const count = getCount(codes, 'E');
  const positionDict = getPositionDict(codes, count, 6);

  // 회사 프로필, 가격, 치츄지수 정렬
  ['company', '가격', '치츄지수'].forEach(key => {
    newTableInfo[key] = sortByPosition(tableInfo[key], positionDict);
  });

  // 각 상품마다 담보 구성이 다르므로,
  // 없으면 보장 금액 0으로 채워넣기
  ['치아보철치료', '치아보존치료', '치수치료'].forEach(optionGroup => {
    newTableInfo[optionGroup] = fillCoverageByZero(
      tableInfo[optionGroup],
      count,
      positionDict,
    );
  });

  // console.log('정렬 후', newTableInfo);
  return newTableInfo;
};
