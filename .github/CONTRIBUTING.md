# Contributing to altML
Hello, and thank you for taking the time to contribute to altML! 🥳

This document is a guide for contributing to all of the parts of altML. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

This project, and everyone participating in it is governed by the [altML Code Of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to any of the project organizers.

## Quick Links
- [**Found a bug? Report it on our issue tracker**](https://github.com/saharshy29/altML/issues)
- [**Found a security vulnerability? Check out SECURITY.md](SECURITY.md)

## Getting started
altML is made up of three parts: there is the chrome extension that the user interacts with, the machine learning model that generates captions, and the [Flask server](https://repl.it/github/saharshy29/altML) that provides an alternate way to recieve captions. To develop for each of these, there are different ways to set them up.

> [If you want to run your own Flask server and you aren't contributing code, click here to copy the repl.it](https://repl.it/github/saharshy29/altML)

**First,** follow the instructions for getting the code on your computer. Then, follow the part-specific instructions for what you want to work on.

### Fork the repository
Follow the [GitHub Help instructions on how to fork a GitHub repository](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo).

**[NOTE: If you are setting up for the Flask Server, you can skip ahead.](#Flask-Server)**

### Cloning
Follow the [GitHub Docs instructions on how to clone a GitHub repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository). You can use either [GitHub Desktop](https://desktop.github.com/), or [Git](https://git-scm.com/).

### Next steps
Follow the below part-specific instructions for what you want to develop for.

## Chrome Extension
*Read More: [What are extensions?](https://developer.chrome.com/extensions)*

The altML Chrome Extension is a program built using HTML, CSS, and JavaScript to interact with the browser. The extension's job is to interact with websites, find images that are missing their `alt` attributes, and contact the caption server to fill them in.

### Loading the extension

Using the [Google Chrome web browser](https://www.google.com/chrome/), navigate to chrome://extensions/. Then, enable ["Developer Mode"](https://developer.chrome.com/extensions/faq#faq-dev-01) by clicking the switch in the top right of the page.

***Note:** If this switch is missing, or if it is greyed out, you might be using a managed Chrome Browser that doesn't allow you to go into developer mode. Try signing out of your organization Google Account, or switching computers and using a personal Google Account that is not managed.*

Now, click the "Load unpacked" button. When it asks you to select the extension directory, find the folder where you cloned altML, and click the `extension` folder.

Now you're all ready to develop!

When you're done making the changes to the files that you like, take a look at our commit message tutorial.

## Neural Network
TODO: Add contributing docs for neural network in `ml` folder

## Flask Server

The Flask Server is a way to pass along caption requests from the client-side to the server-side. From here, the flask server can handle sensitive data like API credentials without anything being exposed in the extension.

The flask server is built in python, and it is still very early in development. Currently, there is no connection from the Chrome Extension to the flask server, but this is planned for the near future.

It is made to be open-source and modular, so that anyone can audit the code that is being used to pass along caption data to credential-backed API requests, and so that anyone can run their own instance of the server.

### [Repl.it](https://repl.it) set-up

Assuming you've already made a fork of the flask server, go to `https://repl.it/github/your-github-username/altML`. [Repl.it](https://repl.it) is an online Code IDE which we use to run our flask server on.

[Repl.it](https://repl.it) should automatically be cloning your fork of the server. This is a working copy that you can use to make your changes, and it will sync back up to GitHub using [Repl.it](https://repl.it)'s GitHub integration.

When you are ready to commit your changes, go to the "Version Control" tab on the left, and craft your commit message using the commit message guidelines.

When you click commit & push, you can now go to GitHub and create a pull request from your clone to the altML repository.

## Crafting a commit message
When you are ready to commit your changes to the repo, we have a couple of guidelines for commit messages that maintainers are not required to follow, but they make the commit history look nice 😄.

Commit messages usually go like this:

> EMOJI ACTION: Summary

> ✨ FEATURE: Add new feature

You can choose any relevant emoji, and the guide at https://gitmoji.carloscuesta.me/ is amazing for choosing one really quickly.

The "Action" should be one world, in all caps, and end with a semi-colon. It's preferred that you put a space between the emoji and the "Action". This word should describe the category for your commit. Something like "FEATURE:", "DOCS:", or "FIX:" are good choices.

Finally, you can write a summary. This should be short and sweet (with an extended summary of changes if needed in the commit description). 

This summary should be written in the [imperative mood](https://en.wikipedia.org/wiki/Imperative_mood). e.g. "make xyzzy do frotz" instead of "[This patch] makes xyzzy do frotz" or "[I] changed xyzzy to do frotz", as if you are giving orders to the codebase to change its behavior.  Try to make sure your explanation can be understood without external resources. ([Thanks git docs!](https://git.kernel.org/pub/scm/git/git.git/tree/Documentation/SubmittingPatches?id=HEAD#n133))

Phew, you've done it, the hard part is over! Now you can focus on...

## Creating a pull request
To bring your changes back to altML, follow [GitHub's guide on creating a pull request from a fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

Make sure to check the boxes in the pre-filled PR (Check a box in GitHub markdown by changing `[ ]` to `[x]`), describe your changes, and link to any related issues.

Thank you so much for contributing ❤️

---

This file is based on [Atom's contributing document](https://github.com/atom/atom/blob/master/CONTRIBUTING.md), as well as [a writeup from Mozilla's Science Lab](https://mozillascience.github.io/working-open-workshop/contributing/). 
