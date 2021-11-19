export const injectCustomJs = (jsPath?: string) => {
  try {
    jsPath = jsPath || 'libs/script/inject.js';
    let temp = document.createElement('script');
    if (!temp) return new Error('发生了错误');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
      if (temp.parentNode) {
        temp.parentNode.removeChild(temp);
      } else {
        document.removeChild(temp);
      }
    };
    document.head.appendChild(temp);
  } catch (error) {
    return new Error('script注入错误');
  }
};
