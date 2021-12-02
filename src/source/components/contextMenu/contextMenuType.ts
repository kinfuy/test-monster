/*
 * @Author: jinhu.yang
 * @Date: 2021-07-23 13:47:34
 * @LastEditors: jinhu.yang
 * @LastEditTime: 2021-07-23 13:49:44
 */
export interface PositionType {
  top: number;
  left: number;
}

export interface ContextMenuConfigType {
  width: number;
  height: number;
}
export interface MenuListitem {
  icon: string;
  name: string;
  code?: string;
  keys?: Array<string>;
  children?: Array<MenuListitem>;
}
