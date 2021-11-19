import { UserType, SeniorSettingRule } from '../source/type/storeType';
import { clearAllCookie } from './utils/util';
import { getELement, createTips, injectCustomJs } from './utils';

const autoInput = (userInfo: { user: UserType; doubleChangeUser: boolean; autoLogin: boolean; code: string; rules: SeniorSettingRule }) => {
  const userInputEle = getELement('user', userInfo.rules.userRule);
  const passWordInputEle = getELement('password', userInfo.rules.passwordRule);
  const validateInputEle = getELement('validate', userInfo.rules.validateRule);
  let loginEle = document.querySelector('.login-btn');
  if (userInputEle && passWordInputEle) {
    const event = new Event('input', { cancelable: true, bubbles: false });
    userInputEle.value = userInfo.user.name;
    passWordInputEle.value = userInfo.user.password;
    userInputEle.dispatchEvent(event);
    passWordInputEle.dispatchEvent(event);
    if (!loginEle) {
      // 最后挣扎尝试寻找一些登录元素
      const loginList = document.querySelectorAll('button>span');
      loginList.forEach((x) => {
        if (x.innerHTML.toString().indexOf('登录') !== -1 && x.parentElement) {
          loginEle = x.parentElement;
        }
      });
    }
    if (userInfo.autoLogin && validateInputEle && loginEle) {
      validateInputEle.value = userInfo.code;
      validateInputEle.dispatchEvent(event);
      const clickEvent = new Event('click', { cancelable: true, bubbles: false });
      loginEle.dispatchEvent(clickEvent);
    }
  } else {
    if (userInfo.doubleChangeUser) {
      window.localStorage.clear();
      window.sessionStorage.clear();
      clearAllCookie();
      window.location.reload();
    } else {
      createTips('不在登录页面', 'error');
    }
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.key === 'clickUser') {
    autoInput(request.info);
    sendResponse();
  }
});
if (document.hidden !== undefined) {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      chrome.runtime.sendMessage({
        key: 'visibilitychange',
        info: {
          url: window.location.href,
        },
      });
    }
  });
}
(function pageLoad() {
  chrome.runtime.sendMessage({
    key: 'pageLoad',
    info: {
      url: window.location.href,
    },
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  injectCustomJs('libs/script/inject.js');
});
