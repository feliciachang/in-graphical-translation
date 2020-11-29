from __future__ import absolute_import, division, print_function
from flask import Flask, send_file, request, render_template, jsonify
import base64
from io import BytesIO
import numpy as np
import sys
import matplotlib.pyplot as plt
import cv2
import imutils
from PIL import Image, ImageFont, ImageDraw, ImageOps
import PIL.Image as pil

import os
import torch
from torchvision import transforms
from monodepth.utils import download_model_if_doesnt_exist
from monodepth import networks

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('home.html')


@app.route('/create-image', methods=["POST"])
def createImage():
    data = request.json
    futureimg = getImage(data["image"], "image-templates/template3.jpg")
    return futureimg


@app.route('/create-circles', methods=["POST"])
def createCircles():
    print("we were called")
    data = request.json
    futureimg = getCircles(data["image"])
    return futureimg


@app.route('/p5js')
def runP5js():
    return render_template('p5js.html')


@app.route("/depth-map")
def runDepthjs():
    return render_template('depth.html')


@app.route('/create-obj-file', methods=["POST"])
def createObjFile():
    print("hi")
    data = request.json
    result = getDepth(data["img"], data["text"], data["name"])
    print(result)
    return result


@app.route("/crop-tester")
def cropTester():
    size = (128, 128)
    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + size, fill=255)

    im = Image.open('static/images/original/fractal-vegetable.jpg')

    output = ImageOps.fit(im, mask.size, centering=(0.5, 0.5))
    output.putalpha(mask)

    output.save('yumyun.png')
    return "done"


def getCircles(img_uri):
    img = data_uri_to_cv2_img(img_uri, "cv2")
    # img = cv2.imread("static/images/original/fractal-vegetable.jpg")
    pilImg = data_uri_to_cv2_img(img_uri, "")
    # pilImg = Image.open(
    # "static/images/original/fractal-vegetable.jpg", mode = "r")
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    print(img)
    cimg = img.copy()
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    print(img)
    img = cv2.medianBlur(img, 5)
    print("hi")
    circles = cv2.HoughCircles(image=img, method=cv2.HOUGH_GRADIENT, dp=0.9,
                               minDist=80, param1=110, param2=39, maxRadius=70)
    print(circles)

    for co, i in enumerate(circles[0, :], start=1):
        x = i[0]
        y = i[1]
        r = int(i[2])
        # crop image as square
        cimg = cimg[int(y-r):int(y+r), int(x-r):int(x+r)]
        img = img[int(y-r):int(y+r), int(x-r):int(x+r)]
        # create a mask
        mask = np.full((img.shape[0], img.shape[1]), 0, dtype=np.uint8)
        # create a circle mask,
        cv2.circle(mask, (r, r), r, (255, 255, 255), -1)
        # get only the inside pixels
        fg = cv2.bitwise_or(img, img, mask=mask)

        mask = cv2.bitwise_not(mask)
        background = np.full(img.shape, 255, dtype=np.uint8)
        bk = cv2.bitwise_or(background, background, mask=mask)
        final = cv2.bitwise_or(fg, bk)
        npImage = np.array(final)
        Image.fromarray(npImage).save("static/images/cropped/circle.png")
        return "static/images/cropped/circle.png"
    return "BROKEN"


def data_uri_to_cv2_img(uri, type):
    if(type == "cv2"):
        encoded_data = uri.split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    else:
        encoded_data = uri.split(',')[1]
        img = Image.open(BytesIO(base64.b64decode(encoded_data)))
    return img


def getImage(img_uri, template):
    originalImg = data_uri_to_cv2_img(img_uri, "cv2")
    originalImg = cv2.cvtColor(originalImg, cv2.COLOR_BGR2RGB)

    # read the image
    img = data_uri_to_cv2_img(img_uri, "cv2")
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    # ret, thresh = cv2.threshold(gray,0,255,cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
    ret, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    # noise removal
    kernel = np.ones((3, 3), np.uint8)
    opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=2)
    # sure background area
    sure_bg = cv2.dilate(opening, kernel, iterations=3)
    # Finding sure foreground area
    dist_transform = cv2.distanceTransform(opening, cv2.DIST_L2, 5)
    ret, sure_fg = cv2.threshold(
        dist_transform, 0.7*dist_transform.max(), 255, 0)
    # Finding unknown region
    sure_fg = np.uint8(sure_fg)
    unknown = cv2.subtract(sure_bg, sure_fg)
    # Marker labelling
    ret, markers = cv2.connectedComponents(sure_fg)
    # Add one to all labels so that sure background is not 0, but 1
    markers = markers+1
    # Now, mark the region of unknown with zero
    markers[unknown == 255] = 0
    markers = cv2.watershed(img, markers)
    # print (markers)
    img[markers == -1] = [255, 0, 0]
    img[markers == 1] = [0, 0, 0]
    img[markers > 1] = [255, 0, 0]

    # futureimg
    img = cv2.cvtColor(originalImg, cv2.COLOR_BGR2GRAY)
    img2 = img.copy()
    template = cv2.imread(template, 0)
    w, h = template.shape[::-1]

    # All the 6 methods for comparison in a list
    # methods = ['cv2.TM_CCOEFF', 'cv2.TM_CCOEFF_NORMED', 'cv2.TM_CCORR',
    #            'cv2.TM_CCORR_NORMED', 'cv2.TM_SQDIFF', 'cv2.TM_SQDIFF_NORMED']
    methods = ['cv2.TM_CCOEFF']

    for meth in methods:
        img = img2.copy()
        method = eval(meth)

        # Apply template Matching
        res = cv2.matchTemplate(img, template, method)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

        # If the method is TM_SQDIFF or TM_SQDIFF_NORMED, take minimum
        if method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
            top_left = min_loc
        else:
            top_left = max_loc
        bottom_right = (top_left[0] + w, top_left[1] + h)
        futureimg = originalImg[top_left[1]
            : bottom_right[1], top_left[0]: bottom_right[0]]

        cv2.rectangle(img, top_left, bottom_right, 255, 2)

    imageNew = Image.fromarray(futureimg)
    imageNew.save("static/images/results/cropped.jpg")
    # buffered = BytesIO()
    # imageNew.save(buffered, format="JPEG")
    # img_str = base64.b64encode(buffered.getvalue())
    return "static/images/results/cropped.jpg"


def getDepth(img_uri, input_text, file_name):
    print("starting get depth")
    # Setting up network and loading weights
    model_name = "mono_640x192"
    download_model_if_doesnt_exist(model_name)
    encoder_path = os.path.join("models", model_name, "encoder.pth")
    depth_decoder_path = os.path.join("models", model_name, "depth.pth")
    # LOADING PRETRAINED MODEL
    encoder = networks.ResnetEncoder(18, False)
    depth_decoder = networks.DepthDecoder(
        num_ch_enc=encoder.num_ch_enc, scales=range(4))
    loaded_dict_enc = torch.load(encoder_path, map_location='cpu')
    filtered_dict_enc = {
        k: v for k, v in loaded_dict_enc.items() if k in encoder.state_dict()}
    encoder.load_state_dict(filtered_dict_enc)
    loaded_dict = torch.load(depth_decoder_path, map_location='cpu')
    depth_decoder.load_state_dict(loaded_dict)
    encoder.eval()
    depth_decoder.eval()
    # Loading the test image and preprocessing
    input_image = data_uri_to_cv2_img(img_uri, "pil")
    left = 0
    top = 0
    right = 500
    bottom = 500
    input_image = input_image.crop((left, top, right, bottom))
    original_width, original_height = input_image.size
    feed_height = loaded_dict_enc['height']
    feed_width = loaded_dict_enc['width']
    input_image_resized = input_image.resize(
        (feed_width, feed_height), pil.LANCZOS)
    input_image_pytorch = transforms.ToTensor()(input_image_resized).unsqueeze(0)

    # Prediction using the PyTorch model
    with torch.no_grad():
        features = encoder(input_image_pytorch)
        outputs = depth_decoder(features)
    disp = outputs[("disp", 0)]

    # Plotting
    disp_resized = torch.nn.functional.interpolate(disp,
                                                   (original_height, original_width), mode="bilinear", align_corners=False)
    print("getting input image")
    # Saving colormapped depth image
    disp_resized_np = disp_resized.squeeze().cpu().numpy()
    print("create file")
    print("input image", (len(disp_resized_np[1]), len(disp_resized_np)))
    im = Image.new("RGBA", (len(disp_resized_np[1]), len(disp_resized_np)))
    print("img size", im.size)
    draw = ImageDraw.Draw(im)
    text = input_text
    print("this is the input text:", input_text)

    # font = ImageFont.truetype(r'C:\Users\feliciachang\Desktop\16020_FUTURAM.ttf', 20)
    text_path = "static/images/type/Montserrat-Regular.ttf"

    font = ImageFont.truetype(text_path, 100)
    draw.text((0, 150), text, fill=(0, 0, 0, 244), font=font, align="left")

    for i in range(len(disp_resized_np)-1):
        for j in range(len(disp_resized_np[i])):
            flipy = len(disp_resized_np) - 1 - j
            try:
                a, b, c, d = im.getpixel((i, flipy))
            except:
                print(i, j, flipy)
                return

    # create obj file
    filename = 'static/images/obj/' + file_name + '.obj'
    thefile = open(filename, 'w')

    vectors = []

    for i in range(len(disp_resized_np)):
        for j in range(len(disp_resized_np[i])):
            # flipy = len(disp_resized_np) - 1 - j
            # r, g, b = input_image.getpixel((i, flipy))
            # thefile.write("v {0} {1} {2} {3} {4} {5} 1.0\n".format(
            #     i, j, 385*disp_resized_np[i][flipy], round(r/255, 4), round(g/255, 4), round(b/255, 4)))
            # vectors.append([i, j, disp_resized_np[i][j]])
            flipy = len(disp_resized_np) - 1 - j
            r, g, b = input_image.getpixel((i, flipy))
            a, b, c, d = im.getpixel((i, flipy))
            if(a == 0 and b == 0 and c == 0 and d == 244):
                r, g, b = input_image.getpixel((i, flipy))
                thefile.write("v {0} {1} {2} {3} {4} {5} 1.0\n".format(
                    i, j, 385*disp_resized_np[i][flipy], round(r/255, 4) + 0.4, round(g/255, 4) + 0.4, round(b/255, 4) + 0.4))
                vectors.append([i, j, disp_resized_np[i][j]])
            else:
                r, g, b = input_image.getpixel((i, flipy))
                thefile.write("v {0} {1} {2} {3} {4} {5} 1.0\n".format(
                    i, j, 385*disp_resized_np[i][flipy], round(r/255, 4), round(g/255, 4), round(b/255, 4)))
                vectors.append([i, j, disp_resized_np[i][j]])

    # for i in range(len(disp_resized_np)):
    #     for j in range(len(disp_resized_np[i])):
    #         idx = i*len(disp_resized_np[i]) + j

    #         if(idx+len(disp_resized_np)+1 < len(vectors)):
    #             a = vectors[idx]
    #             b = vectors[idx+len(disp_resized_np)]
    #             c = vectors[idx+len(disp_resized_np)+1]
    #             diff1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
    #             diff2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]]
    #             cross = np.cross(diff1, diff2)
    #             # triangle2
    #             a2 = vectors[idx]
    #             b2 = vectors[idx+len(disp_resized_np)+1]
    #             c2 = vectors[idx+1]
    #             diff3 = [b2[0] - a2[0], b2[1] - a2[1], b2[2] - a2[2]]
    #             diff4 = [c2[0] - a2[0], c2[1] - a2[1], c[2] - a2[2]]
    #             cross2 = np.cross(diff3, diff4)
    #             thefile.write("vn {0} {1} {2}\n".format(
    #                 round(cross[0], 4), round(cross[1], 4), round(cross[2], 4)))
    #             thefile.write("vn {0} {1} {2}\n".format(
    #                 round(cross2[0], 4), round(cross2[1], 4), round(cross2[2], 4)))

    thefile.write("usemtl Material\n")
    thefile.write("s off\n")

    normal = 1
    print("writing 2 file")
    for i in range(len(disp_resized_np)):
        for j in range(len(disp_resized_np[i])):
            idx = i*len(disp_resized_np[i]) + j
            if(idx+len(disp_resized_np)+1 < 148225):
                thefile.write("f {0}//{3} {1}//{3} {2}//{3}\n".format(idx+1,
                                                                      idx+len(disp_resized_np)+1, idx+len(disp_resized_np)+2, normal))
                thefile.write("f {0}//{3} {1}//{3} {2}//{3}\n".format(idx +
                                                                      1, idx+len(disp_resized_np)+2, idx+2, normal))
                normal += 1

    thefile.close()
    print("closed file")
    return "done"


if __name__ == "__main__":
    app.run(debug=True)
