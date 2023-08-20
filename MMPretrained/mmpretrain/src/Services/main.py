from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import pandas as pd
import matplotlib.pyplot as plt
from io import BytesIO
import PIL
from PIL import Image
import io
from fastapi.responses import StreamingResponse
import os
import glob
import subprocess
import shlex
from mmpretrain import ImageRetrievalInferencer
from mmpretrain import TextToImageRetrievalInferencer
import glob
from fastapi.responses import JSONResponse


# if you clone this repo, should create new environment in your local
# make sure you active env before run app and deactive env after using
# run app: uvicorn main:app --reload
# FastAPi doc: https://fastapi.tiangolo.com/tutorial/first-steps/
# See Swagger: http://127.0.0.1:8000/docs
# Tutorial for create api with FastAPI: https://anderfernandez.com/en/blog/how-to-create-api-python/#:~:text=To%20create%20an%20API%20in%20Python%20with%20Flask%2C%20we%20have,app%20%3D%20Flask()%20%40app.
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dataset = [path for path in glob.glob("D:\VisionRetrival\IRSDB\images\**.jpg")]
imageInferencer = ImageRetrievalInferencer(
        'resnet50-arcface_inshop',
        prototype=dataset,
        prototype_cache='images.pth')

textInferencer = TextToImageRetrievalInferencer(
            'blip-base_3rdparty_retrieval',
            prototype=dataset,
            prototype_cache='t2i_retri.pth')

@app.get("/")
async def root():
    return {"message": "Hello World 222"}


@app.get("/my-first-api")
def hello(name: str):
    return {'Hello ' + name + '!'}


@app.get("/get-iris")
def get_iris():

    url = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv'
    iris = pd.read_csv(url)

    return iris


@app.get("/plot-iris")
def plot_iris():
    file = open('iris.png', mode="rb")

    # reson why use this line: https://stackoverflow.com/questions/55873174/how-do-i-return-an-image-in-fastapi
    return Response(content=file.read(), media_type="image/png")

@app.get("/images/{image_path}")
def plot_iris(image_path: str):
    file = open(image_path, mode="rb")

    # reson why use this line: https://stackoverflow.com/questions/55873174/how-do-i-return-an-image-in-fastapi
    return Response(content=file.read(), media_type="image/jpg")


@app.get("/video")
def video():
    some_file_path = "test.mp4"

    def iterfile():  #
        with open(some_file_path, mode="rb") as file_like:  #
            yield from file_like  #

    return StreamingResponse(iterfile(), media_type="video/mp4")


@app.post("/uploadfile")
async def upload_file(file: UploadFile):
    contents = await file.read()
    imgpath = "D:\VisionRetrival\Queries\query.jpg"
    image = Image.open(io.BytesIO(contents))
    image = image.convert("RGB")
    image.save(imgpath)
    
    result = imageInferencer(imgpath, topk=2)[0]
    response = []
    for r in result:
        data = {}
        data['match_score'] = round(r['match_score'].item(), 3)
        data['img_path'] = r['sample']['img_path']
        response.append(data)
    return JSONResponse(content=response)
        
@app.post("/retrieve-by-text")
async def upload_file(query: str):
    
    result = textInferencer(query, topk=2)[0]
    response = []
    for r in result:
        data = {}
        data['match_score'] = round(r['match_score'].item(), 3)
        data['img_path'] = r['sample']['img_path']
        response.append(data)
    return JSONResponse(content=response)
