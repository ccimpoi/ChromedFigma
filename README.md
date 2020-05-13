# ChromedFigma

Exports the prototype of a Figma page from the current file opened in the browser to static html files linked using image maps.

Important: Please set your Figma Personal Access Token in the extension Options page first.

Notes:

In order to emulate the Figma "Back" interaction you can use the string `__back__` in the name of an element (that does not already have a transition to another element) and this element will export to a link with `javascript:history.back();`.

It assumes that you already exported the frames to *.png image files in a folder. Then you copy the exported *.html files in the same folder and open one of them.

## How to use

Download and unpack the archive in the `./unpacked` folder on your local hard drive, enable developer mode in Chrome Extensions, click "Load unpacked" and choose the unpacked `ChromedFigma` folder.
