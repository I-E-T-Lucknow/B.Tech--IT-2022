Automatic-Signature-verification
Link to the deployed App on Heroku Platform : https://lit-waters-92367.herokuapp.com/

------->IDEA

Current methods in machine learning and statistics have allowed for the reliable automation of many of these tasks (face verification, fingerprinting, iris recognition). Among the numerous tasks used for biometric authentication is signature verification, which aims to detect whether a given signature is genuine or forged.

Signature verification is essential in preventing falsification of documents in numerous financial, legal, and other commercial settings. The task presents several unique difficulties: high intra-class variability (an individual’s signature may vary greatly day-to-day), large temporal variation (signature may change completely over time) and high inter-class similarity (forgeries, by nature, attempt to be as indistinguishable from genuine signatures as possible). Our aim is to develop an AI based signature verification system that is scalable and can be easily used to detect fraud cases in various public and private sector settings such as banks, post-offices, government offices and co-operatives too and reduce manual effort.

Our idea is to extract the previously stored signature from the system using the concept of image segmentation using OpenCV and Tesseract and then apply deep learning model that we have developed and classify if the signature under scrutiny is right and matching or falsified. In the signature classification model, pre-processing of the dataset is very important wherein have done the noise removal and property adjustment part(angular rotation, resizing and exact position detection). In the signature classification model we would be using Convolutional Neural Networks and Transfer Learning techniques. Our final task will be to ensure that the model that we have developed is scalable and can be used across all the places of interests easily and can be used by even the common people without knowing indepth about the system.

TOOLS USED

Python : Overall Web-App Django : Python Framework for backend Heroku : Web-App Deployment Platform OpenCV : Image Pre-processing Tesseract : Text Extraction Tensorflow : Signature Verification Model Keras : Signature Verification and OCR Model HTML+CSS : Front-End Javascript : Front-End Ajax : Make Request to Web-Server SQLite3 : Database Management System About this Repository

mysite folder is the main folder. The Web-App is based on Django framework. MNIST weights and SIGNET weights are the weights of the saved model. Inner mysite folder contains Django App settings and Sig_verify contains views, models, database and other important files required for app functioning. mysite/Templates/sig_verify contains all the front-end codes of our present Web-App. Test_Case_Document folder contains sample test case forms

------>How to Run a Sample Test Case

step-1 Open the webpage at link: https://lit-waters-92367.herokuapp.com/

step-2 Click on the “Update Mandate” button and choose a file. The file is nothing but a scanned as well as filled “Mandate Form” in the Test_Cases_Documents step-3 Upload any of the forms from the Test_Case_Document folder in this repository. Click on the Submit button. Refresh the page to test another form (refreshing is mandatory) step-4 You can see the progress bar moving. Once all the code in the backend has been executed, the probability of two signature being matched gets displayed. It also displays the account number that has been fetched by the OCR Model

Shivansh Purwar 1805213054 1805213054@ietlucknow.ac.in 6397941182 [Resume]

Abhishek Kumar Batham 1805213003 bathamabhishek955@gmail.com 7007182867

Saumitra dhar dubey 1805213051 1805213051@ietlucknow.ac.in 8887635489

Kaushlendra kumar 1805213026 1805213026@ietlucknow.ac.in 9870959421