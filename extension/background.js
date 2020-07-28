const testPageURL = chrome.runtime.getURL("test.html");

console.info("altML: background.js is loaded.");
console.info(`altML: The test page is located at ${testPageURL}`);

chrome.runtime.onMessage.addListener( // Listen for messages from other altML files
function(message, callback, sendResponse) {
  switch(message) {
    case "loadPreferences": // Fills all of the preferences with default values when there isn't anything saved.

    function setPreference(key, value) {
      chrome.storage.sync.get([key], function(result) {
        if(result.key === undefined) {
          chrome.storage.sync.set({key: value}, function() {
            console.info("altML: " + key + ' is undefined, set to default "' + value + '"');
          });
        }
      });
    }

    setPreference('caption-server-url', "https://caption-server-url.com"); // TODO: Add default caption server URL to use
    sendResponse({ result: "success" });
    break;
    default:
      sendResponse({ result: "error", message: "This message shouldn't appear. If you are seeing this, please let us know! 😄" });
  }
})