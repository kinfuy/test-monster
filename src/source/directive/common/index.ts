/*
 * @Author: jinhu.yang
 * @Date: 2021-07-21 11:43:18
 * @LastEditors: jinhu.yang
 * @LastEditTime: 2021-07-21 13:33:08
 */
const getHeight = function getHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight;
};
const Height = {
  name: 'Height',
  fn: {
    mounted: function(el: HTMLElement) {
      el.style.height = getHeight() - 2 + 'px';
    },
  },
};
export { Height };
