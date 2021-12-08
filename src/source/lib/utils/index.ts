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
// 生成uuid
export const UUID = (): string => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
  });
  return uuid;
};
