import { Menuitem } from './../../components/contextMenu/contextMenuType';
// 有key就会响应click事件

const commonMenuOptions: Array<Menuitem> = [
  {
    id: '1',
    icon: 'week-dakai',
    name: '打开',
    group: ['folder', 'file'],
    key: 'OPEN',
  },
  {
    id: '2',
    icon: 'week-fuzhi',
    name: '复制',
    group: ['folder', 'file'],
    key: 'COPY',
  },
  {
    id: '3',
    icon: 'week-tupianjianqie',
    name: '剪切',
    group: ['folder', 'file'],
    key: 'CUT',
  },
  {
    id: '4',
    icon: 'week-zhongmingming',
    name: '重命名',
    group: ['folder', 'file'],
    key: 'EDIT',
  },
  {
    id: '5',
    icon: 'week-niantie',
    name: '粘贴',
    group: ['paste'],
    key: 'PASTE',
  },
  {
    id: '6',
    icon: 'week-shezhi-',
    group: ['folder', 'file'],
    name: '设置',
    key: 'SET',
  },
  {
    id: '7',
    icon: 'week-shanchu1',
    group: ['folder', 'file'],
    name: '删除',
    key: 'DELETE',
  },
];
const scriptMenuOptions: Array<Menuitem> = [
  {
    id: '8',
    icon: 'week-wenjianjia_',
    name: '新建脚本',
    group: ['script'],
    key: 'CREATE_SCRIPT',
  },
  {
    id: '10',
    group: ['script'],
    icon: 'week-xinjianwenjianjia',
    name: '新建脚本集',
    key: 'CREATE_GROUP',
  },
  {
    id: '9',
    icon: 'week-paixu',
    name: '排序',
    key: 'SORT',
    group: ['script'],
    children: [
      {
        id: '9-1',
        icon: 'week-wenben2',
        name: '名称',
        key: 'SORT_NAME',
      },
      {
        id: '9-2',
        icon: 'week-shijian',
        name: '时间',
        key: 'SORT_TIME',
      },
      {
        id: '9-3',
        icon: 'week-fuwuleixing',
        name: '类型',
        key: 'SORT_TYPE',
      },
    ],
  },
];
const folderMenuOptions: Array<Menuitem> = [
  {
    id: '1',
    icon: 'week-fenxiang',
    name: '分享',
    key: 'CREATE_FILE',
    children: [
      {
        id: '1',
        icon: 'week-link',
        name: '生成链接',
        key: 'SHARE_LINK',
      },
      {
        id: '1',
        icon: 'week-erweima',
        name: '生成二维码',
        key: 'SHARE_CODE',
      },
      {
        id: '1',
        icon: 'week-tuandui1',
        name: '分享好友',
        key: 'SHARE_FRIENDS',
      },
    ],
  },
];

/**
 * @description 获取鼠标右键菜单
 * @param {string} key 菜单标识（script,file,folder)
 */
export const getContextMenu = (group: Array<string> = []) => {
  let menulist = [];
  menulist = [...commonMenuOptions, ...scriptMenuOptions, ...folderMenuOptions].filter((x) => {
    return group.some((l) => x.group?.includes(l));
  });
  return menulist;
};
