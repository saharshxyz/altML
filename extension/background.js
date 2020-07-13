const testPageURL = chrome.runtime.getURL("test.html");

console.info("altML: background.js is loaded.");
console.info(`altML: The test page is located at ${testPageURL}`);

chrome.runtime.onMessage.addListener(
    function(message, callback) {
      if (message == "runContentScript"){
        chrome.tabs.executeScript({
          file: 'contentScript.js'
        });
      }
   });