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

// TODO: Implement save button to update the extension preferences.å