import { getXPath, getELementXpath, createRandomCode, dispatchEventHandler } from './utils/util';
import OperateHistory from './history';
const operateHistory = new OperateHistory();
document.addEventListener('click', (e: any) => {
  console.log('捕获到点击事件');
  if (e.target.id === 'testKey') return;
  const path = getXPath(e.target);
  const UUID = createRandomCode(16);
  if (e.target.nodeName && e.target.nodeName === 'INPUT') {
    e.target.addEventListener('blur', (res: any) => {
      operateHistory.addOperate(UUID, {
        xpath: path,
        triggerEvent: 'FORM_INPUT',
        opearte: {
          dispatchEvent: () => {
            e.target.value = '7410780';
            console.log('我执行了FORM_INPUT');
            dispatchEventHandler('input', e.target);
          },
        },
      });
    });
  } else {
    if (path) {
      operateHistory.addOperate(UUID, {
        xpath: path,
        triggerEvent: 'CLICK',
        opearte: {
          clickElement: () => {
            console.log('CLICK');
            dispatchEventHandler('click', e.target);
          },
        },
      });
    }
  }
});

const createBtn = () => {
  const btn = document.createElement('div');
  btn.id = 'testKey';
  btn.innerText = '操作复现';
  btn.style.padding = '8px';
  btn.style.color = '#fff';
  btn.style.backgroundColor = 'red';
  btn.style.position = 'absolute';
  btn.style.top = '50%';
  btn.style.left = '50%';
  btn.style.zIndex = '9999';
  btn.addEventListener('click', () => {
    operateHistory.runOperate();
  });
  document.body.appendChild(btn);
};
createBtn();
