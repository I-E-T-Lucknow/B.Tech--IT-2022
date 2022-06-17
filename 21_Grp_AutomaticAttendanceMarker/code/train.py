import tkinter as tk
from tkinter import Message ,Text
import cv2,os
import shutil
import csv
import numpy as np
from PIL import Image, ImageTk
import pandas as pd
import datetime
import time
import tkinter.ttk as ttk
import tkinter.font as font





def clear():
    IDForm.delete(0, 'end')    
    res = ""
    message.configure(text= res)

def clear2():
    NameForm.delete(0, 'end')    
    res = ""
    message.configure(text= res)    
    
def is_number(s):
    try:
        float(s)
        return True
    except:
        pass
 
    try:
        import unicodedata
        unicodedata.numeric(s)
        return True
    except:
        pass
 
    return False

def isAlpha(name):
    for i in name:
        if not ((i>='A' and i<='Z') or (i>='a' and i<='z')):
            return False
    return True

def TakeImages():        
    Id=(IDForm.get())
    name=(NameForm.get())
    if(is_number(Id) and isAlpha(name)):
        cam = cv2.VideoCapture(0)
        harcascadePath = "haarcascade_frontalface_default.xml"
        detector=cv2.CascadeClassifier(harcascadePath)
        sampleNum=0
        while(True):
            ret, img = cam.read()
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = detector.detectMultiScale(gray, 1.3, 5)
            for (x,y,w,h) in faces:
                cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)        
                #incrementing sample number 
                sampleNum=sampleNum+1
                #saving the captured face in the dataset folder TrainingImage
                cv2.imwrite("TrainingImage\ "+name +"."+Id +'.'+ str(sampleNum) + ".jpg", gray[y:y+h,x:x+w])
                #display the frame
                cv2.imshow('frame',img)
            #wait for 100 miliseconds 
            if cv2.waitKey(100) & 0xFF == ord('q'):
                break
            # break if the sample number is more than 100
            elif sampleNum>60:
                break
        cam.release()
        cv2.destroyAllWindows() 
        res = "Images Saved for ID : " + Id +" Name : "+ name
        row = [Id , name]
        with open('StudentDetails\StudentDetails.csv','a+') as csvFile:
            writer = csv.writer(csvFile)
            writer.writerow(row)
        csvFile.close()
        messageInNotification.configure(text= res)
    else:
        if(is_number(Id)):
            res = "Enter Alphabetical Name"
            messageInNotification.configure(text= res)
        elif(isAlpha(name)):
            res = "Enter Numeric Id"
            messageInNotification.configure(text= res)
        else :
            res="Both credentials invalid"
            messageInNotification.configure(text=res)

    
def TrainImages():
    recognizer = cv2.face_LBPHFaceRecognizer.create()
    harcascadePath = "haarcascade_frontalface_default.xml"
    detector =cv2.CascadeClassifier(harcascadePath)
    faces,Id = getImagesAndLabels("TrainingImage")
    recognizer.train(faces, np.array(Id))
    recognizer.save("TrainingImageLabel\Trainner.yml")
    res = "Image Trained"#+",".join(str(f) for f in Id)
    messageInNotification.configure(text= res)

def getImagesAndLabels(path):
    #get the path of all the files in the folder
    imagePaths=[os.path.join(path,f) for f in os.listdir(path)] 
    #print(imagePaths)
    
    #create empth face list
    faces=[]
    #create empty ID list
    Ids=[]
    #now looping through all the image paths and loading the Ids and the images
    for imagePath in imagePaths:
        #loading the image and converting it to gray scale
        pilImage=Image.open(imagePath).convert('L')
        #Now we are converting the PIL image into numpy array
        imageNp=np.array(pilImage,'uint8')
        #getting the Id from the image
        Id=int(os.path.split(imagePath)[-1].split(".")[1])
        # extract the face from the training image sample
        faces.append(imageNp)
        Ids.append(Id)        
    return faces,Ids

def TrackImages():
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read("TrainingImageLabel\Trainner.yml")
    harcascadePath = "haarcascade_frontalface_default.xml"
    faceCascade = cv2.CascadeClassifier(harcascadePath);    
    df=pd.read_csv("StudentDetails\StudentDetails.csv")
    cam = cv2.VideoCapture(0)
    font = cv2.FONT_HERSHEY_SIMPLEX        
    col_names =  ['Id','Name','Date','Time']
    attendance = pd.DataFrame(columns = col_names)    
    while True:
        ret, im =cam.read()
        gray=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
        faces=faceCascade.detectMultiScale(gray, 1.2,5)    
        for(x,y,w,h) in faces:
            cv2.rectangle(im,(x,y),(x+w,y+h),(225,0,0),2)
            Id, conf = recognizer.predict(gray[y:y+h,x:x+w])                                   
            if(conf < 50):
                ts = time.time()      
                date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
                timeStamp = datetime.datetime.fromtimestamp(ts).strftime('%H:%M:%S')
                aa=df.loc[df['Id'] == Id]['Name'].values
                tt=str(Id)+"-"+aa
                attendance.loc[len(attendance)] = [Id,aa,date,timeStamp]   

            else:
                Id='Unknown'                
                tt=str(Id)  
            if(conf > 75):
                noOfFile=len(os.listdir("ImagesUnknown"))+1
                cv2.imwrite("ImagesUnknown\Image"+str(noOfFile) + ".jpg", im[y:y+h,x:x+w])            
            cv2.putText(im,str(tt),(x,y+h), font, 1,(255,255,255),2)        
        attendance=attendance.drop_duplicates(subset=['Id'],keep='first')    
        cv2.imshow('im',im) 
        if (cv2.waitKey(1)==ord('q')):
            break
    ts = time.time()      
    date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
    timeStamp = datetime.datetime.fromtimestamp(ts).strftime('%H:%M:%S')
    Hour,Minute,Second=timeStamp.split(":")
    fileName="Attendance\Attendance_"+date+"_"+Hour+"-"+Minute+"-"+Second+".csv"
    attendance.to_csv(fileName,index=False)
    cam.release()
    cv2.destroyAllWindows()
    res=attendance
    messageInAttendance.configure(text= res)



window = tk.Tk()
window.title("Face_Recogniser")

dialog_title = 'QUIT'
dialog_text = 'Are you sure?'

window.configure(background="gray71")

window.grid_rowconfigure(0, weight=1)
window.grid_columnconfigure(0, weight=1)

image = Image.open("C:/Users/Kushagra Srivastava/project/Face-Recognition-Based-Attendance-System/logo.png")
image = image.resize((200, 200), Image.ANTIALIAS)

img = ImageTk.PhotoImage(image)
labels = tk.Label(image = img, bg="gray71")
labels.place(x=100,y=20)
img1 = ImageTk.PhotoImage(image)
labels1 = tk.Label(window, image = img1, bg="gray71")
labels1.place(x=1200,y=20)

heading = tk.Label(window, text="Automatic Attendance Marker\nIET Lucknow" ,bg="gray71"  ,fg="black"  ,width=40  ,height=2,font=('times', 25, 'bold underline')) 
heading.place(x=390,y=20)

IDButton = tk.Button(window, text="Enter ID",width=15 ,height=1,fg="black"  ,bg="gray71" , activebackground = "gray71" ,font=('times', 15, ' bold ') ) 
IDButton.place(x=400, y=200)

IDForm = tk.Entry(window,width=20  ,bg="gray81" ,fg="black",font=('times', 15, ' bold '))
IDForm.place(x=700, y=200)

NameButton = tk.Button(window, text="Enter Name",width=15  ,fg="black"  , activebackground = "gray71" ,bg="gray71" ,font=('times', 15, ' bold ')) 
NameButton.place(x=400, y=300)

NameForm = tk.Entry(window,width=20  ,bg="gray81"  ,fg="black",font=('times', 15, ' bold ')  )
NameForm.place(x=700, y=315)

NotificationButton = tk.Button(window, text="Notification : ",width=15  ,fg="black"  , activebackground = "gray71" ,bg="gray71",font=('times', 15, ' bold')) 
NotificationButton.place(x=400, y=400)

messageInNotification = tk.Label(window, text="" ,bg="gray81"  ,fg="black"  ,width=36, font=('times', 15, ' bold ')) 
messageInNotification.place(x=700, y=400)

AttendanceButton = tk.Button(window, text="Attendance : ",width=15  ,fg="black"  ,bg="gray71",activebackground = "gray71" ,font=('times', 15, ' bold ')) 
AttendanceButton.place(x=400, y=650)


messageInAttendance = tk.Label(window, text="" ,fg="black",width=36,bg="gray81",activeforeground = "gray81",font=('times', 15, ' bold ')) 
messageInAttendance.place(x=700, y=650)


  
clearButton = tk.Button(window, text="Clear", command=clear  ,width=15,height=1,fg="black"  ,bg="gray71",activebackground = "gray71" ,font=('times', 15, ' bold '))
clearButton.place(x=950, y=200)

clearButton2 = tk.Button(window, text="Clear", command=clear2  ,width=15,fg="black"  ,bg="gray71", activebackground = "gray71" ,font=('times', 15, ' bold '))
clearButton2.place(x=950, y=300) 

takeImg = tk.Button(window, text="Take Images", command=TakeImages  ,width=15,fg="black"  ,bg="gray71", activebackground = "gray71" ,font=('times', 15, ' bold '))
takeImg.place(x=200, y=500)

trainImg = tk.Button(window, text="Train Images", command=TrainImages  ,width=15,fg="black"  ,bg="gray71", activebackground = "gray71" ,font=('times', 15, ' bold '))
trainImg.place(x=500, y=500)

trackImg = tk.Button(window, text="Track Images", command=TrackImages  ,width=15,fg="black"  ,bg="gray71", activebackground = "gray71" ,font=('times', 15, ' bold '))
trackImg.place(x=800, y=500)

quitWindow = tk.Button(window, text="Quit", command=window.destroy  ,width=15,fg="black"  ,bg="gray71", activebackground = "gray71" ,font=('times', 15, ' bold '))
quitWindow.place(x=1100, y=500)

copyrights = tk.Text(window, background=window.cget("background"), borderwidth=0,font=('times', 30, 'italic bold'))
copyrights.tag_configure("superscript", offset=10)
copyrights.insert("insert", "UNDER THE GUIDANCE OF ->\nPROF. D.S. YADAV & MS. DEEPALI AWASTHI\nDeveloped for IET Lucknow\nDeveloped by Kushagra, Kashif, Riyansh","", "", "superscript")
copyrights.configure(state="disabled",fg="black",bg="gray71",font=('times', 13, ' bold '))
copyrights.pack(side="left")
copyrights.place(x=1120, y=700)
 
 

window.mainloop()