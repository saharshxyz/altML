console.info("altML: altML is now running JS on this page!");

if(window.location.href.includes(chrome.runtime.getURL("test.html"))) { // If the URL matches the test page
  console.warn("altML: altML might run a little differently on this page than on the rest of the internet. You have been warned!");
}

// Insert code that find empty alt tags in images, and replaces them with generated alt tags.
