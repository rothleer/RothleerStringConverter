chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse(window.getSelection().toString());
});