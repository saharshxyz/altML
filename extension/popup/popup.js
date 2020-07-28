console.info("altML: Asked background.js to load extension preferences.");
chrome.runtime.sendMessage("loadPreferences", function(response) { // Ask background.js to load extension preferences.
    
    if(response.result == "success") { // If background.js tells popup.js that the extension preferences are loaded.
        console.info(`altML: Successfully loaded extension preferences!`);
        // TODO: Insert code that changes the text inside of the Caption server URL box to the currently saved option
    } else {
        // TODO: Insert code that adds a red warning text at the top of the popup saying that the extension failed to load extension preferences.
        console.error(`altML: Error loading extension preferences. Message from background: ${JSON.stringify(response)}`)
    }
    
});

let serverURLFormData = document.getElementById("caption-server-url"); // Stores element where the caption server URL from the form is
let serverURLExampleElement = document.getElementById("example"); // Stores element where the example of the query selector URL is

serverURLFormData.addEventListener("input", function captionServerURLChange() { // Whenever any data is changed in the caption server URL input box, set the example of the query selector URL to the caption server URL
    serverURLExampleElement.innerHTML = serverURLFormData.value;
});

// TODO: Implement save button to update the extension preferences.