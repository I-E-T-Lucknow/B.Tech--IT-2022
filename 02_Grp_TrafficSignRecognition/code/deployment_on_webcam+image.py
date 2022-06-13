import tkinter as tk
from tkinter import filedialog
from tkinter import *
from PIL import ImageTk, Image
import numpy
from keras.models import load_model
import warnings
import cv2
window = Tk()
from time import sleep

model = load_model('Trafic_signs_model.h5')
warnings.filterwarnings("ignore", category=DeprecationWarning)

classes = { 1:'Speed limit (20km/h)',
            2:'Speed limit (30km/h)',      
            3:'Speed limit (50km/h)',       
            4:'Speed limit (60km/h)',      
            5:'Speed limit (70km/h)',    
            6:'Speed limit (80km/h)',      
            7:'End of speed limit (80km/h)',     
            8:'Speed limit (100km/h)',    
            9:'Speed limit (120km/h)',     
           10:'No passing',   
           11:'No passing veh over 3.5 tons',     
           12:'Right-of-way at intersection',     
           13:'Priority road',    
           14:'Yield',     
           15:'Stop',       
           16:'No vehicles',       
           17:'Veh > 3.5 tons prohibited',       
           18:'No entry',       
           19:'General caution',     
           20:'Dangerous curve left',      
           21:'Dangerous curve right',   
           22:'Double curve',      
           23:'Bumpy road',     
           24:'Slippery road',       
           25:'Road narrows on the right',  
           26:'Road work',    
           27:'Traffic signals',      
           28:'Pedestrians',     
           29:'Children crossing',     
           30:'Bicycles crossing',       
           31:'Beware of ice/snow',
           32:'Wild animals crossing',      
           33:'End speed + passing limits',      
           34:'Turn right ahead',     
           35:'Turn left ahead',       
           36:'Ahead only',      
           37:'Go straight or right',      
           38:'Go straight or left',      
           39:'Keep right',     
           40:'Keep left',      
           41:'Roundabout mandatory',     
           42:'End of no passing',      
           43:'End no passing veh > 3.5 tons' }







print("Choose the method which you want to run the model")
print("To run with GUI press '1'")
print("To run with webcam press '2'")
a = int(input("Please enter here"))
if a==1:
    window.geometry('600x500')
    window.title('Traffic sign classifier')

    window.configure(background='#1e3e64')

    heading = Label(window, text="Traffic Sign Classifier",padx=220, font=('Verdana',20,'bold'))
    heading.configure(background='#143953',foreground='white')
    heading.pack()

    sign = Label(window)
    sign.configure(background='#1e3e64')

    value = Label(window,font=('Helvetica',15,'bold'))
    value.configure(background='#1e3e64')

    def classify(file_path):
        global label_packed
        image = Image.open(file_path)
        image = image.resize((30,30))
        image = numpy.expand_dims(image, axis=0)
        image = numpy.array(image)
        #print(image.shape)
        pred = model.predict(image)
        pred1 =pred
        pred1 = numpy.max(pred)
    
        pred = numpy.argmax(pred)
        print(pred)
        sign = classes[pred+1]
        #sign = classes[pred+1]
        print(sign)
        value.configure(foreground='#ffffff', text=sign)

    def show_cb(file_path):
        classify_b=Button(window,text="Classify Image",command=lambda: classify(file_path),padx=20,pady=5)
        classify_b.configure(background='#147a81', foreground='white',font=('arial',10,'bold'))
        classify_b.place(relx=0.6,rely=0.80)
    
    def uploader():
        try:
            file_path = filedialog.askopenfilename()
            uploaded = Image.open(file_path)
            uploaded.thumbnail(((window.winfo_width()/2.25),(window.winfo_height()/2.25)))
            im = ImageTk.PhotoImage(uploaded)
        
            sign.configure(image=im)
            sign.image=im
            value.configure(text='')
            show_cb(file_path)
        except:
            pass

    upload = Button(window,text="Upload an image",command=uploader,padx=10,pady=5)
    upload.configure(background='#e8d08e', foreground='#143953',font=('arial',10,'bold'))
    upload.pack()
    upload.place(x=100, y=400)

    sign.pack()
    sign.place(x=230,y=100)
    value.pack()
    value.place(x=240,y=300)

    window.mainloop()    

elif a==2:
    img_counter = 0
    cam = cv2.VideoCapture(0)
    while True:
        ret, frame = cam.read()
        if not ret:
            print('failed to grab frame')
            break
        cv2.imshow("frame", frame)
        
        image = frame
        image = cv2.resize(image,(30,30))
        image = numpy.expand_dims(image, axis=0)
        image = numpy.array(image)
        #print(image.shape)
        pred = model.predict(image)
        pred1 =pred
        pred1 = numpy.max(pred)
        if pred1>0.70:

    
            pred = numpy.argmax(pred)
            sign = classes[pred+1]
            #sign = classes[pred+1]
            print(sign)
            print(pred1)
            sleep(1)

        
            #print('No photo detected')
    #to get continuous live video feed from my laptops webcam
        k  = cv2.waitKey(1)
    # if the escape key is been pressed, the app will stop
        if k%256 == 27:
            print('escape hit, closing the app')
            break
    # if the spacebar key is been pressed
    # screenshots will be taken
        elif k%256  == 32:
        # the format for storing the images scrreenshotted
            img_name = f'opencv_frame_{img_counter}'
        # saves the image as a png file
            cv2.imwrite(img_name, frame)
            print('screenshot taken')
        # the number of images automaticallly increases by 1
            img_counter += 1

# release the camera
    cam.release()

# stops the camera window
    cam.destoryAllWindows()

else:
    print("Wrong number")