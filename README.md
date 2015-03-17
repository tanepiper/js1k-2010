# Ripple + Gradient effects in < 1Kb

## This project is only here for archive purposes.


This is the source code of my entry for the #JS1K competition (http://js1k.com/)

Generates procedural water ripple effects on top of a randomly generated gradient background.
Click on the canvas to generate a new wave, hold Shift + Click to change the gradient background.

There is an issue with the Firefox canvas implementation that is a known bug (https://bugzilla.mozilla.org/show_bug.cgi?id=498826)
There is no way around this issue at this time, with a test case to confirm this:
http://philip.html5.org/tests/canvas/suite/tests/index.2d.imageData.put.dirty.html

1.0
  * Original Release
1.1
  * Fix for Firefox
1.2
  * Further exception catch for Firefox canvas bug (https://bugzilla.mozilla.org/show_bug.cgi?id=498826)
  * Added onclick to canvas to randomly change gradient background
  * Savage Optimisation
1.3
  * Removed onready stuff
  * Removed setter methods on canvas for size
  * Added handler for click to create new ripple, Ctrl + Click to change background
  * Fred Savage Optimisation
1.4
  * Changed handler from Ctrl to Shift for better Mac support
1.5
  * Savage Garden Optimisation, final version for submission

Some work based on the origional algorithim from http://bit.ly/bmDo1Q, optimised
for 1Kb
