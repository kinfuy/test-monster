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
// 事件记录tips
export class NativeRecord extends NativeBase {
  constructor() {
    super('test-monster-record', 'block');
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
      stop.className = 'test-monster-tool-stop';
      stop.addEventListener('click', handleStop);
      const text = document.createElement('div');
      text.className = 'test-monster-tool-text';
      text.innerText = 'Test Monster 记录中';
      this.example.appendChild(text);
      this.example.appendChild(stop);
    }
  }
}
