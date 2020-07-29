const captionServerURLPreference = document.getElementById("caption-server-url");
const messageFormatPreference = document.getElementById("message-format");
const queryStringPreference = document.getElementById("query-string");
const DEVplaceholderCaptionsPreference = document.getElementById("placeholder-captions");

function submitPreferences() { // Saves preferences to storage, and shows a message letting the user know that options were saved.
    chrome.storage.sync.set({ // Set preferences in chrome synced storage
        captionServerURL: captionServerURLPreference.value,
        messageFormat: messageFormatPreference.value,
        queryString: queryStringPreference.value
    }, function () {

        chrome.storage.local.set({ // Set development preferences in chrome local storage 
            DEVplaceholderCaptions: DEVplaceholderCaptionsPreference.checked
        });

        // Update status to let user know options were saved
        const status = document.getElementById("status");
        status.textContent = "Options saved.";
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });

    
}

function onCaptionURLPreferenceChange() { 
    // Set the example of the query selector URL to the caption server URL
    const queryURLExample = document.getElementById("query-url-example");
    queryURLExample.innerHTML = captionServerURLPreference.value;

    // When the caption server URL box has http instead of https, highlight in red the HTTPS requirement reminder
    if(captionServerURLPreference.value.includes("https")) {
        document.getElementById("warning").style.color = "black";
    } else {
        document.getElementById("warning").style.color = "red";
    }
    
}

function restore_options() { // Gets preferences from storage, and updates page with saved preferences
    chrome.storage.sync.get({ // Get from storage, or if there are no saved preferences, get default values
      captionServerURL: 'https://caption-server-url.com/',
      messageFormat: "url-parameter",
      queryString: "img"
    }, function(syncItems) { // Update page with saved preferences
      captionServerURLPreference.value = syncItems.captionServerURL;
      onCaptionURLPreferenceChange();
      messageFormatPreference.value = syncItems.messageFormat;
      queryStringPreference.value = syncItems.queryString;
      
      chrome.storage.local.get({ // Gets developer preferences from local storage, or if there are no saved preferences, get default values
        DEVplaceholderCaptions: false
      }, function (localItems) { // Update page with saved preferences
        DEVplaceholderCaptionsPreference.checked = localItems.DEVplaceholderCaptions; 
      });

    });
  }

captionServerURLPreference.addEventListener("input", onCaptionURLPreferenceChange); // Whenever any data is changed in the input box, run function

document.addEventListener('DOMContentLoaded', restore_options); // Whenever the page is loaded, run function

// Configure save button to save preferences
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submitPreferences);