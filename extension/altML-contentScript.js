const currentPageURL = window.location.href; // Get current page URL
console.info(`altML: now running JS on ${currentPageURL}`);

if(currentPageURL.includes("http")) { // If current page looks like it is on the web 

  console.info(`altML: Starting image scan...`);

  let images = document.images; // Get object with all images on a page

  for(i = 0; i < images.length; i++) { // Loop over all of the images in the website
    const currentImage = images[i];
    const oldAlt = currentImage.alt;
    const src = currentImage.src;

    if(oldAlt == "" && currentImage.hasAttribute("src") && src !== "") { // If the image is valid, and is missing an alt tag

      chrome.storage.sync.get({ // Get from storage, or if there are no saved preferences, set default values
        captionServerURL: 'https://caption-server-url.com/',
        messageFormat: "url-parameter",
        queryString: "img"
      }, function (syncItems) {
        chrome.storage.local.get({ // Gets developer preferences from local storage, or if there are no saved preferences, set default values
          DEVplaceholderCaptions: false
        }, function (localItems) {
          if(localItems.DEVplaceholderCaptions === false) { // Skip to else if developer placeholder captions are active
            if(syncItems.messageFormat == "url-parameter") { // If message preferences is set to send message to server with a query string
              const queryURL = syncItems.captionServerURL + "?" + syncItems.queryString + "=" + src; // Set query URL that will be used to call the server for this image. 

                fetch(queryURL) // Fetch data from caption server using query URL
                  .then(response => {
                    if (!response.ok) { // If response HTTP code is not 200-299 (means that the extension got a bad response)
                      throw new Error('Network response was not ok'); // Throw error (see catch below)
                    }
                    return response.text(); // When things are well, return reponse text
                  })
                  .then(myCaption => { // Change alt tags using caption data
                    let newAlt = myCaption; // Set newAlt to recieved caption
                    oldAlt = newAlt; // Update page alt attribute
                    console.info(`altML: changed the alt tag in "${src}" from "${oldAlt}" to "${newAlt}"`);
                  })
                  .catch(error => { // When an error is thrown, warn in the console.
                    console.warn(`altML: Error reaching caption server '${syncItems.captionServerURL}' with query URL '${queryURL}'`, error);
                  });
    
            } else { // When the messageFormat is not url-parameter, that means that the user wants to send a message to the caption server in a different way. POST is planned, but is not implemented yet. This gives an error, because it should be impossible to be in this state for right now.
              console.error("altML: Invalid messageFormat. Please let us know if you see this error message! Sorry ☹️")
            }
          } else { // Run when developer placeholder captions are active (sets alt tags to placeholders, doesn't contact caption server)
            const newAlt = `altML changed the text in this alt tag. If you did not intend this, uncheck "Enable placeholder captions" in the extension settings. If you do not see this setting, click the reset button, then click save.`;
            oldAlt = newAlt;
            console.warn(`altML: Used development option "Enable placeholder captions", and changed the alt tag in "${images[i].src}" from "${oldAlt}" to "${newAlt}"`);
          }
        });

      
      });
    }
  }

  console.info(`altML: Image scan finished!`);

}