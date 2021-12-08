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
export interface Menuitem {
  icon: string;
  name: string;
  key?: string;
  group?: string[];
  render?: () => void;
  children?: Array<Menuitem>;
}

export interface StyleParams {
  position?: 'static' | 'relative' | 'absolute' | 'sticky';
  top: string;
  left: string;
}
export interface ContextMenueProps {
  menuConfig: Array<Menuitem>;
  onClick?: (key: any) => void;
  onClose?: () => void;
}
export interface ContextMenuInstance extends ContextMenueProps {
  $el: HTMLElement;
}
