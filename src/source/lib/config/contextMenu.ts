import { Menuitem } from './../../components/contextMenu/contextMenuType';
const folderMenuOption: Array<Menuitem> = [
  {
    icon: 'week-wenjianjia_',
    name: '新建',
    children: [
      {
        icon: 'week-xinjian',
        name: '新建脚本',
        key: 'CREATE_FILE',
      },
      {
        icon: 'week-xinjianwenjianjia',
        name: '新建分组',
        key: 'CREATE_FOLDER',
        children: [
          {
            icon: 'week-xinjianwenjianjia',
            name: '分组1',
            key: 'CREATE_FOLDER1',
          },
        ],
      },
    ],
  },
  {
    icon: 'week-niantie',
    name: '粘贴',
    key: 'PASTE',
  },
  {
    icon: 'week-paixu',
    name: '排序',
    children: [
      {
        icon: 'week-wenben2',
        name: '名称',
        key: 'PASTE',
      },
      {
        icon: 'week-zitidaxiao-',
        name: '大小',
        key: 'PASTE',
      },
      {
        icon: 'week-shijian',
        name: '时间',
        key: 'PASTE',
      },
      {
        icon: 'week-fuwuleixing',
        name: '类型',
        key: 'PASTE',
      },
    ],
  },
  {
    icon: 'week-chakan',
    name: '视图',
    children: [
      {
        icon: 'week-liebiao',
        name: '列表',
        key: 'OPEN',
      },
      {
        icon: 'week-tubiao',
        name: '图标',
        key: 'OPEN',
      },
    ],
  },
  {
    icon: 'week-dakai',
    name: '打开',
    key: 'OPEN',
  },
  {
    icon: 'week-fuzhi',
    name: '复制',
    key: 'COPY',
  },
  {
    icon: 'week-tupianjianqie',
    name: '剪切',
    key: 'CUT',
  },
  {
    icon: 'week-zhongmingming',
    name: '重命名',
    key: 'EDIT',
  },
  {
    icon: 'week-fenxiang',
    name: '分享',
    children: [
      {
        icon: 'week-link',
        name: '生成链接',
        key: 'SHARE_LINK',
      },
      {
        icon: 'week-erweima',
        name: '生成二维码',
        key: 'SHARE_key',
      },
      {
        icon: 'week-tuandui1',
        name: '分享好友',
        key: 'SHARE_FRIENDS',
      },
    ],
  },
  {
    icon: 'week-danganziliao-guidangziliao',
    name: '归档',
    key: 'SAVE',
  },
  {
    icon: 'week-shezhi-',
    name: '设置',
    key: 'SET',
  },
  {
    icon: 'week-shanchu1',
    name: '删除',
    key: 'DELETE',
  },
];
/**
 * @description 获取鼠标右键菜单
 * @param {string} key 菜单标识（empty,folder)
 */
export const getContextMenu = (group: string) => {
  let menulist = [];
  menulist = folderMenuOption.filter((x) => {
    return x.group ? x.group.includes(group) : true;
  });
  return menulist;
};
