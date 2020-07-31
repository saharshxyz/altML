# altML

**Mission:** A chrome extension that processes at all the images on a webpage. If there is an image that does not have an alt tag, use machine learning to generate one so that screen-readers can actually recognize it.

Created by [May F.,](https://github.com/maydonut) [James K.](https://github.com/thatrobotdev), and [Jonathan A.](https://github.com/jonny13), during the [CodeLabs Internship 2020](https://labs.codeday.org/). Mentored by [Saharsh Yeruva](https://github.com/saharshy29).

altML is made up of three parts: there is the chrome extension that the user interacts with, the machine learning model that generates captions, and the [Flask server](https://repl.it/github/saharshy29/altML) that provides an alternate way to recieve captions.

### Contributing
If you want to contribute to the project, check out the [CONTRIBUTING.md](.github/CONTRIBUTING.md) file!

### License Information
altML is licensed under the MIT License. You can find the full license in [LICENSE.md](.github/LICENSE.md).

### Code Of Conduct
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](.github/CODE_OF_CONDUCT.md)

This project, and everyone participating in it is governed by the [altML Code Of Conduct](.github/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to any of the project organizers.

## Image Caption Generator
A neural network to generate captions for an image using CNN and RNN with BEAM Search.

[See the Image Caption Generator specific README.md]((ml/README.md))

## Chrome Extension
The altML Chrome Extension is a program built using HTML, CSS, and JavaScript to interact with the browser. The extension's job is to interact with websites, find images that are missing their `alt` attributes, and contact the caption server to fill them in.

[See the Chrome Extension specific README.md]((extension/README.md))

## Flask Server
[![Run on Repl.it](https://repl.it/badge/github/saharshy29/altML)](https://repl.it/github/saharshy29/altML)

The Flask Server is a way to pass along caption requests from the client-side to the server-side. From here, the flask server can handle sensitive data like API credentials without anything being exposed in the extension.

The flask server is built in python, and it is still very early in development. Currently, there is no connection from the Chrome Extension to the flask server, but this is planned for the near future.

It is made to be open-source and modular, so that anyone can audit the code that is being used to pass along caption data to credential-backed API requests, and so that anyone can run their own instance of the server.

[See the Flask Server specific README.md]((flask_server/README.md))
