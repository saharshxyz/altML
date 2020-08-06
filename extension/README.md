## altML Chrome Extension
*Read More: [What are extensions?](https://developer.chrome.com/extensions)*

The altML Chrome Extension is a program built using HTML, CSS, and JavaScript to interact with the browser. The extension's job is to interact with websites, find images that are missing their `alt` attributes, and contact the caption server to fill them in.

- [`assets/icons`](assets/icons) is where all of the icons for the extension live.
- [`popup`](popup) holds the files that load whenever you click on the icon for the chrome extension. This is where preference options are set.
- [`altML-contentScript.js`](altML-contentScript.js) is the JS injected on every web page. This is where images are scanned and captions are fetched from the server,
- [`background.js`](background.js) this is an extension file that runs in the background instead of per-page.
- [`manifest.json`](manifest.json) is where the extension information for Chrome and the Chrome Web Store is located. This requests permissions from the browser, and tells the browser about extension file locations and options.


