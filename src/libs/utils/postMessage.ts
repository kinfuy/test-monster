export const sendMessageToContentScript = function (message: object, callback?: Function) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(Number(tabs[0].id), message, function (response) {
      if (callback) callback(response);
    });
  });
};
