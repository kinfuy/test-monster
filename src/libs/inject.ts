import { getXPath, getELementXpath, createRandomCode, dispatchEventHandler } from './utils/util';
document.addEventListener('click', (e: any) => {
  console.log('捕获到点击事件');
  if (e.target.id === 'testKey') return;
  const path = getXPath(e.target);
  const UUID = createRandomCode(16);
  if (e.target.nodeName && e.target.nodeName === 'INPUT') {
    e.target.addEventListener('blur', (res: any) => {});
  } else {
    if (path) {
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
  btn.style.position = 'fixed';
  btn.style.top = '50%';
  btn.style.left = '50%';
  btn.style.zIndex = '9999';
  btn.style.cursor = 'pointer';
  btn.addEventListener('click', () => {});
  document.body.appendChild(btn);
};
createBtn();
