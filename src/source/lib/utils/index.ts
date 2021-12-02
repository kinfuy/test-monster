interface WindowSize {
  height: number;
  width: number;
}
/**
 * @ description 获取屏幕高度和宽度
 */
export const getWindowSize = (): WindowSize => {
  const height = document.documentElement.clientHeight || document.body.clientHeight;
  const width = document.documentElement.clientWidth || document.body.clientWidth;
  return {
    height,
    width,
  };
};
