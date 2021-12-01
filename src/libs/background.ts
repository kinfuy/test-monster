import 'babel-polyfill';
import { chromeAddListenerMessage, setStore } from './utils';
chromeAddListenerMessage((request, sendResponse) => {
  window.open(chrome.extension.getURL(`/libs/views/script.html`));
  console.log(request);
});
