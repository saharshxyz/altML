# Flask Server
[![Run on Repl.it](https://repl.it/badge/github/saharshy29/altML)](https://repl.it/github/saharshy29/altML)

The Flask Server is a way to pass along caption requests from the client-side to the server-side. From here, the flask server can handle sensitive data like API credentials without anything being exposed in the extension.

The flask server is built in python, and it is still very early in development. Currently, there is no connection from the Chrome Extension to the flask server, but this is planned for the near future.

It is made to be open-source and modular, so that anyone can audit the code that is being used to pass along caption data to credential-backed API requests, and so that anyone can run their own instance of the server.