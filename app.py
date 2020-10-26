from flask import Flask, send_file, request, render_template
import numpy as np
import sys
import matplotlib.pyplot as plt
import cv2
import imutils
from PIL import Image, ImageFont, ImageDraw
import PIL.Image as pil

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/create-image')
def createImage():
    print(request.args)
    getImage("fly.jpg", "template3.jpg")
    return send_file("cropped.jpg")

@app.route('/p5js')
def runP5js():
    return render_template('index.html')

def getImage(img_path, template):
    originalImg = cv2.imread(img_path)
    originalImg = cv2.cvtColor(originalImg, cv2.COLOR_BGR2RGB)

    # read the image
    img = cv2.imread(img_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    #ret, thresh = cv2.threshold(gray,0,255,cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
    ret, thresh = cv2.threshold(gray,150,255,cv2.THRESH_BINARY)
    # noise removal
    kernel = np.ones((3,3),np.uint8)
    opening = cv2.morphologyEx(thresh,cv2.MORPH_OPEN,kernel, iterations = 2)
    # sure background area
    sure_bg = cv2.dilate(opening,kernel,iterations=3)
    # Finding sure foreground area
    dist_transform = cv2.distanceTransform(opening,cv2.DIST_L2,5)
    ret, sure_fg = cv2.threshold(dist_transform,0.7*dist_transform.max(),255,0)
    # Finding unknown region
    sure_fg = np.uint8(sure_fg)
    unknown = cv2.subtract(sure_bg,sure_fg)
    # Marker labelling
    ret, markers = cv2.connectedComponents(sure_fg)
    # Add one to all labels so that sure background is not 0, but 1
    markers = markers+1
    # Now, mark the region of unknown with zero
    markers[unknown==255] = 0
    markers = cv2.watershed(img,markers)
    #print (markers)
    img[markers == -1] = [255,0,0]
    img[markers == 1] = [0, 0, 0]
    img[markers > 1] = [255, 0, 0]

    #futureimg
    img = cv2.cvtColor(originalImg, cv2.COLOR_BGR2GRAY)
    img2 = img.copy()
    template = cv2.imread(template,0)
    w, h = template.shape[::-1]

    # All the 6 methods for comparison in a list
    #methods = ['cv2.TM_CCOEFF', 'cv2.TM_CCOEFF_NORMED', 'cv2.TM_CCORR',
    #            'cv2.TM_CCORR_NORMED', 'cv2.TM_SQDIFF', 'cv2.TM_SQDIFF_NORMED']
    methods = ['cv2.TM_CCOEFF']

    for meth in methods:
        img = img2.copy()
        method = eval(meth)

        # Apply template Matching
        res = cv2.matchTemplate(img,template,method)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

        # If the method is TM_SQDIFF or TM_SQDIFF_NORMED, take minimum
        if method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
            top_left = min_loc
        else:
            top_left = max_loc
        bottom_right = (top_left[0] + w, top_left[1] + h)
        print (top_left[0])
        print (bottom_right)
        futureimg = originalImg[top_left[1]:bottom_right[1], top_left[0]:bottom_right[0]]

        cv2.rectangle(img,top_left, bottom_right, 255, 2)

    imageNew = Image.fromarray(futureimg)
    imageNew.save("cropped.jpg")

if __name__ == "__main__":
    app.run(debug=True)

