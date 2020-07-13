const currentPageURL = window.location.href;

console.info(`altML: altML is now running JS on ${currentPageURL}`);

const testPageURL = chrome.runtime.getURL("test.html");

if(currentPageURL.includes(testPageURL)) { // If the current page URL matches the test page
  console.warn(`altML: altML may run a little differently on this test page (${testPageURL}) than on the rest of the internet. You have been warned!`);
}

// Insert code that find empty alt tags in images, and replaces them with generated alt tags.
