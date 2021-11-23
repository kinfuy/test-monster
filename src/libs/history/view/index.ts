import { NativeBase } from './../types';
// 记录提示倒计时
export class NativeMask extends NativeBase {
  constructor() {
    super('test-monster-mask', 'block');
  }
  /**
   *
   * @param time 持续时间
   */
  init(time: number) {
    return new Promise((resolve, reject) => {
      if (this.example) {
        this.example.innerHTML = `<span class='test-monster-mask-text'>开始记录:${time}</span>`;
        this.show();
        let t1 = setInterval(() => {
          if (!this.example) return;
          time--;
          this.example.innerHTML = `<span class='test-monster-mask-text'>开始记录:${time}</span>`;
          if (time === 0) {
            this.hidden();
            clearInterval(t1);
            resolve('mask is hidden!');
          }
        }, 1000);
      } else {
        reject('实例未初始化！');
      }
    });
  }
}
// 工具栏
export class NativeTool extends NativeBase {
  constructor(handleStop: () => void) {
    super('test-monster-tool', 'flex');
    this.appendChild(handleStop);
  }
  appendChild(handleStop: () => void) {
    if (this.example) {
      const stop = document.createElement('div');
      stop.dataset.testMonster = 'true';
      stop.className = 'test-monster-tool-stop';
      stop.addEventListener('click', handleStop);
      const text = document.createElement('div');
      text.dataset.testMonster = 'true';
      text.className = 'test-monster-tool-text';
      text.innerText = 'Test Monster 记录中';
      this.example.appendChild(text);
      this.example.appendChild(stop);
    }
  }
}
// 事件记录tips
import { createRandomCode } from './../../utils/index';
const recordList: Array<{ id: string; el: HTMLDivElement }> = [];
export class NativeRecord extends NativeBase {
  id = createRandomCode(32);
  message = '';
  constructor(message: string, className: string = '') {
    super(`test-monster-record ${className}`, 'block');
    this.message = message;
    if (this.example) {
      this.example.style.top = (recordList.length + 1) * 50 + 'px';
      recordList.push({
        id: this.id,
        el: this.example,
      });
      this.updateRecord();
    }
    this.appendChild();
  }
  updateRecord() {
    recordList.forEach((x, index) => {
      x.el.style.top = (index + 1) * 60 + 'px';
    });
  }
  appendChild() {
    if (this.example) {
      const close = document.createElement('div');
      close.className = 'test-monster-record-close';
      close.dataset.testMonster = 'true';
      close.innerText = '×';
      close.addEventListener('click', () => {
        this.destroy();
      });
      const text = document.createElement('div');
      text.className = 'test-monster-record-message';
      text.dataset.testMonster = 'true';
      text.innerHTML = `<div data-test-monster='true'>${this.message}</div>`;
      this.example.appendChild(text);
      this.example.appendChild(close);
    }
  }
  destroy() {
    if (this.example) document.body.removeChild(this.example);
    this.example = undefined;
    this.status = 0;
    for (let i = 0; i < recordList.length; i++) {
      if (recordList[i].id === this.id) {
        recordList.splice(i, 1);
        i--;
      }
    }
    this.updateRecord();
  }
  autoClose(time: number) {
    this.show();
    let t = setTimeout(() => {
      this.destroy();
      clearTimeout(t);
    }, time);
  }
}
