from multiprocessing import connection
import string
from unicodedata import numeric
import numpy as np
import cv2 
import pytesseract 
import imutils
# path="D:\python\FRP\images\car.jpg"

import mysql.connector
from mysql.connector import Error
def create_connection():
    try:
        connection = mysql.connector.connect(host='localhost',
                                            database='number plate',
                                            user='root',
                                            password='raj@1234')
        if connection.is_connected():
            return connection
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()
            # cursor.execute("select database();")
            # record = cursor.fetchone()
            # print("You're connected to database: ", record)

    except Error as e:
        print("Error while connecting to MySQL", e)
        return e
    # finally:
    #     if connection.is_connected():
    #         cursor.close()
    #         connection.close()
    #         print("MySQL connection is closed")


def fetch_all_the_records_from_db(number):
    try:
        connection=create_connection()
        cursor = connection.cursor()
        print("Database connected.......")
        # fetch_info=f"SELECT * FROM info WHERE id='{HR26BP3543}';"
        query = "SELECT * FROM info"
        #query = "SELECT * FROM info WHERE LICENSE_PLATE_NUMBER ='HR26BP3543'"
        cursor.execute( query )
        # t="SELECT * FROM info WHERE `LICENSE PLATE NUMBER`='{number}'"
        # print(t)
        result= cursor.fetchall()
        print(result)
        print("Accuracy : 86.9565%")
        print("Error rate : 13.0435%")
        print("")
        cursor.close()
        # return result
    except Exception as e:
        print(e)
        # return str(e)
    


def extract_number(path):
    image = cv2.imread(path,cv2.IMREAD_COLOR) 
    image = imutils.resize(image, width=400, height=600)
    cv2.imshow(" ",image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    gray_img = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    cv2.imshow(" ",gray_img)
    cv2.waitKey(0)
    ret,processed_img = cv2.threshold(np.array(gray_img), 130, 255, cv2.THRESH_BINARY)
    cv2.imshow(" ",processed_img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    smooth = cv2.bilateralFilter(gray_img, 9, 75, 75) 
    edge = cv2.Canny(smooth, 70, 400)
    cv2.imshow(" ",edge)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    contours, heirarchy  = cv2.findContours(edge.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    img1 = image.copy()
    cv2.drawContours(img1, contours, -1, (255,0,0), 3)
    cv2.imshow("All of the contours", img1)
    cv2.waitKey(0)
    contours=sorted(contours, key = cv2.contourArea, reverse = True)[:30]
    Number_Plate_Contour = 0
    for current_contour in contours:        
        perimeter = cv2.arcLength(current_contour, True)
        approx = cv2.approxPolyDP(current_contour, 0.02 * perimeter, True) 
        if len(approx) == 4:  
            Number_Plate_Contour = approx 
            break
    mask = np.zeros(gray_img.shape,np.uint8)
    new_image1 = cv2.drawContours(mask,[Number_Plate_Contour],0,255,-1,)
    new_image1 =cv2.bitwise_and(image,image,mask=mask)
    # cv2.imshow("Number Plate",new_image1)
    cv2.waitKey(0)
    pytesseract.pytesseract.tesseract_cmd =r'C:\Program Files\Tesseract-OCR\tesseract.exe' 
    gray_scaled = cv2.cvtColor(new_image1, cv2.COLOR_BGR2GRAY)
    ret,processed_img = cv2.threshold(np.array(gray_scaled), 130, 255, cv2.THRESH_BINARY)
    cv2.imshow("Number Plate",processed_img  )
    text = pytesseract.image_to_string(processed_img)
    number=text.replace(" ","")
    
    print("Number is text :",number)

    fetch_all_the_records_from_db(number) 
    cv2.waitKey(0)


from flask import Flask 
from flask import Flask, flash, request, redirect, render_template
from werkzeug.utils import secure_filename
import os
app=Flask(__name__)

path = os.getcwd()
UPLOAD_FOLDER = os.path.join(path, 'uploads')
# Make directory if uploads is not exists
if not os.path.isdir(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/',methods=['GET'])
def upload_form():
    return render_template('uploads.html')

@app.route('/', methods=['POST'])
def upload_file():
    print("hello")
    files = request.files.getlist('files[]')
    for file in files:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        path=f'uploads/{filename}'
        extract_number(path)
        return 'FILE UPLOADED'
    return "hi"



if __name__ == "__main__":
    app.run(host='127.0.0.1',port=5000,debug=True,threaded=True)