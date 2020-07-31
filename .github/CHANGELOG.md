# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

For more information on how to update this changelog, see our guide in [CONTRIBUTING.md](.github/CONTRIBUTING.md) under the "Updating the Changelog" section.


## [Unreleased]
### Chrome Extension

**Added** ✨
- Hello World! Chrome extension framework created.
- Runs a content script on each page that finds valid images without `alt` attributes, and sends information to a user-defined caption server that returns a caption for the extension to place in the empty `alt` attribute.
- Add support for sending images via a URL Parameter using a query string with an image source.
- Add options panel with a customizable caption server URL, message format, and query string.
- Add extension logo, and icons for `browser_action` (Logo and icons made by [@MayDonut](https://github.com/MayDonut)!)

### Neural Network
- TODO: Add changes for Neural Network

### Flask API Server
**Added** ✨
- Hello World! Flask API Server for securing private API keys has been created.
-  Repl.it badge in [README.md](README.md) added for easy server deployment.
...



[MAJOR.MINOR.PATCH]: https://semver.org/
[Unreleased]: https://github.com/saharshy29/altML/