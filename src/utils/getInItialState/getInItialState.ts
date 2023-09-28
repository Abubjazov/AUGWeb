export const getInitialState = (
  windowInnerWidth: number,
  setPoint: number,
  inverse?: boolean,
) =>
  inverse
    ? windowInnerWidth > setPoint
      ? false
      : true
    : windowInnerWidth > setPoint
    ? true
    : false
