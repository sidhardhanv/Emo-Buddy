import os
from flask import Flask, render_template, request,jsonify
from flask import send_from_directory
import numpy as np
from keras.models import load_model
from flask_cors import CORS
import tensorflow as tf
import cv2
from PIL import Image


app = Flask(__name__)
# ip here ipv4
CORS(app,origins=['http://localhost:3000', 'http://192.168.1.36:3000'])

dir_path = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER = 'uploads'
STATIC_FOLDER = 'static'
image_size=tuple((224, 224))    
b=[]
# classes=['angry',
#  'disgust',
#  'fear',
#  'happy',
#  'neutral',
#  'sad',
#  'surprise']

emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

#graph = tf.get_default_graph()
#with graph.as_default():
    # load model at very first
# model =tf.keras.models.load_model('static/my_model')
model = load_model('static/model.hdf5')
print('model loaded')
face_cascade = cv2.CascadeClassifier('static/haarcascade_frontalface_default.xml')

# call model to predict an image
def api(full_path):
    img = cv2.imread(full_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    print(full_path)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
    if len(faces)>0:
        (x, y, w, h)=faces[0]
        cp_img=gray[y:y+h, x:x+w]
    else:
        return -1
    face_roi = cv2.resize(cp_img, (48, 48))
    face_roi = face_roi.astype("float") / 255.0
    face_roi = np.expand_dims(face_roi, axis=0)
    face_roi = np.expand_dims(face_roi, axis=-1)

    #with graph.as_default():
    predicted = model.predict(face_roi)[0]
    emotion_label = emotion_labels[np.argmax(predicted)]
    return emotion_label

 #home page
@app.route('/')
def home():
   return render_template('home.html')
   



# procesing uploaded file and predict it
@app.route('/upload', methods=['POST','GET'])
def upload_file():
    if request.method == 'GET':
        return render_template('home.html')
    else:
        file = request.files['image']
        full_name = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(full_name)

        result = api(full_name)
        
    if result==-1:
        return  render_template('home.html',noface=1)   
    return render_template('home.html',result1=result)


@app.route('/upload1', methods=['POST','GET'])
def upload_file1():
    if request.method == 'GET':
        return render_template('home.html')
    else:
        file = request.files['image']
        full_name = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(full_name)

        result = api(full_name)
        print (result)
        
    if result==-1:
        return  jsonify({'result':'noface'})   
    return jsonify({'result':result})


@app.route('/uploads/<filename>')
def send_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')

#    
 