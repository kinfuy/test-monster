/*
 * @Author: jinhu.yang
 * @Date: 2021-07-23 13:47:34
 * @LastEditors: jinhu.yang
 * @LastEditTime: 2021-07-23 13:49:44
 */
export interface Point {
  x: number;
  y: number;
}

export interface SelectAreaProps {
  startPoint: Point;
  endPoint: Point;
}
export interface SelectAreaInstance extends SelectAreaProps {
  $el: HTMLElement;
}
