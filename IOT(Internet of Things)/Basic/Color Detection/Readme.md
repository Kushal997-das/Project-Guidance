# Color-Detector
It is an implementation of an image color detector which identifies all the colors in an image. For this OpenCV module is used to read the images.

## Working with OpenCV
To read any image, we use the method cv2.imread() and specify the complete path of the image which gets imported into the notebook as a Numpy array. We can then plot it using the pyplot’s method imshow(). The method cvtColor allows us to convert the image rendering to a different color space. To move from BGR color space to RGB, we use the method cv2.COLOR_BGR2RGB. In some situations, we might want to have black and white images. In such cases, we can express images as Gray. We now use the conversion space as cv2.COLOR_BGR2GRAY and show the output with the colormap as gray. We can also resize the image to a given dimension. We use the method resize provided by cv2. The first argument is the image we want to resize, and the second argument is the width and height defined within parentheses.

## Color Identification
RGB to Hex Conversion
We’d first define a function that will convert RGB to hex so that we can use them as labels for our pie chart. On reading the color which is in RGB space, we return a string. {:02x} simply displays the hex value for the respective color.

## Read image in RGB color space
Next, we define a method that will help us get an image into Python in the RGB space. We supply the path of the image as the argument . First, we read the file using imread and then change its color space before returning it.
