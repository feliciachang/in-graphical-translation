
# In Graphical Translation
Senior thesis for Computing and the Arts by Felicia Chang

## Running the App

Install dependencies (preferably to a virtual environment)

```bash
pip3 install -r requirements.txt
```

Run the app

```bash
python app.py
```

## Production

You can find the live app at https://felicia-senior-thesis.herokuapp.com/

# Design

## Image as Type

### Frontend
You can find the html file for Image as Type under `templates` in `p5js.html`.
The html file merely provides the skeleton. The graphics are created in `sketch.js` and `createWord.js` found in the `scripts` folder.

### Backend
Image processing is done in `app.py` using the functions `getImage` and `getCircles`.


## Type as Image

### Frontend
You can find the html file for Type as Image under `templates` in `depth.html`.
Like Image as Type, the graphics are processed in `modelDepth.js` found in the `scripts` folder.

### Backend
Image processing is also done in `app.py` using the function `getDepth`.

## Resources
The Monodepth Library (https://github.com/nianticlabs/monodepth2) for the depth map algorithms.
WebGl Fundamentals (https://webglfundamentals.org/) for providing guidance in navigating the WebGL library. 
OpenCV (https://opencv.org/) for image processing API's.

# Acknowledgments
Thank you to Holy Rushmeier for technical guidance and Julian Bittiner for artistic guidance.



