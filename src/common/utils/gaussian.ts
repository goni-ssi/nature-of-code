/**
 * 평균(mean)과 표준 편차(sd)를 갖는 정규 분포 난수를 반환합니다.
 * Box-Muller 변환(Polar Form)을 사용하여 구현됩니다.
 * * @param {number} mean - 분포의 평균 (기본값: 0)
 * @param {number} sd - 분포의 표준 편차 (기본값: 1)
 * @returns {number} 정규 분포를 따르는 난수
 */
let nextGaussian = NaN; // 이전에 계산된 두 번째 표준 정규 분포 값 저장
let hasNextGaussian = false; // 저장된 값이 있는지 여부

export const randomGaussian = (mean = 0, sd = 1) => {
  let z0, z1;

  // 이전에 계산된 값이 있다면 그것을 사용하고 플래그를 리셋
  if (hasNextGaussian) {
    hasNextGaussian = false;
    z0 = nextGaussian;
  } else {
    // Box-Muller 변환을 사용하여 두 개의 독립적인 표준 정규 분포 값(z0, z1) 생성
    let u, v, s;
    do {
      // [-1, 1) 범위의 균일 난수 2개 생성
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;
      s = u * u + v * v;
    } while (s >= 1 || s === 0); // s가 0이거나 1보다 크면 재시도

    const mul = Math.sqrt((-2.0 * Math.log(s)) / s);
    z0 = u * mul; // 첫 번째 표준 정규 분포 값
    z1 = v * mul; // 두 번째 표준 정규 분포 값

    // 두 번째 값을 저장하고 플래그 설정
    nextGaussian = z1;
    hasNextGaussian = true;
  }

  // 표준 정규 분포 값(z0)을 원하는 평균과 표준 편차로 변환하여 반환
  return sd * z0 + mean;
};
