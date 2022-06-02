/** 배열이 비어있는지 체크하는 함수 */
export const isEmpty = <T>(arr: Array<T>) =>
  Array.isArray(arr) && arr.length === 0;
// function isEmpty<T>(arr: Array<T>): boolean {
//   return Array.isArray(arr) && arr.length === 0;
// }

/** Python의 range처럼, 개수만큼의 배열을 반환 (끝자리 제외) */
export const range = (length: number): number[] =>
  Array.from(Array(length).keys());
