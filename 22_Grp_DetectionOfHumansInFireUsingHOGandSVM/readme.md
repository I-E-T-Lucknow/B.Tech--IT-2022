# Detection of Human in Fire Using HOG and SVM

<div  align="center"  right-margin="3px">
<img  height="50%"  width="70%"  src="https://drive.google.com/uc?id=1RL4o86LzwSUdO8FYvBVYtgxrHhoNa_PZ"  height="300px"  border-radius="5px">
</div>
<div  left-margin="2px"  align="justify">
The project helps detect the humans who are stuck in fire and are usually not visible to the eyes due to high smoke and flame. The project can be broken down into two merging segments - the first is detecting the Fire, and the second is detecting the human. The fire detection algorithm detects the Fire and flames in the environment if present; the module works based on colour format YCbCr. It uses a Histogram of Oriented Gradient(HOG) and Support Vector Machine(SVM) to detect a human in the Fire. It evaluates several motion-based feature sets for human detection in the form of videos.<br><br>
	Our final year project, done under the guidance of <strong>Dr Upendra Kumar</strong> and <strong>Ms. Mudita Sharan</strong>
</div>

  
  

# Parts

  

## 1. Fire Detection Methodology

  

<div  align="center"  right-margin="3px">
<img  src="https://drive.google.com/uc?id=16Y-p9ARYlMBzK1v8ysobGxnbmckdqg6v"  height="350px"  border-radius="5px">
</div>

  

1. Fire Detection using YCbCr component.

2. Using Background Subtraction algo for noise removal for clarification.

3. Using Frame Differencing algo to differentiate moving objects

4. Convert RGB to YCbCr

5. Detect fire pixels on moving objects using fire detection rules of color thresholding

	5.1 If detected, go for human detection

	5.2 If not detected, go for background subtraction

  
  

  

## 2. Human detection Methodology

<div  align="center"  right-margin="3px">
<img  src="https://drive.google.com/uc?id=1oSvxLyoWWnewTK1RNbT4Ay4R-2-_JnEC"  height="350px"  border-radius="5px">
</div>

1. For Human detection we are using HOG as a feature descriptor for Extracting features.

2. Then Extracted features are used to Train a SVM Model ( Support Vector machine).

3. Then trained model is saved in a file for future use.

4. In order to use the model we have to load the model

5. Then use the loaded model to predict the presence of Human and create a rectangular box around them.

  
  

## Steps to run the project on Colab

1. Download the Dataset 	         👉 [⬇️](https://www.kaggle.com/datasets/phylake1337/fire-dataset) 

2. Upload the dataset on drive and Mount the drive.

3. Upload notebook file on Google Colab and Open.(run all the cells)
 
4. Extract the feature using HOG function and save that features in a separate folder named features.<br>
	4.1 Postive feature in pos_mod<br>
	4.2 negative feature in neg_mod<br>

5. Train the model using the extracted features and save the model as ```svm.xml``` in models folder.

6. Load the Model from the model folder.

7. To test it on a folder containing few Images Provide the Path to the folder.<br>
	``` input_folder_path = "/content/drive/MyDrive/Data/test_image" ```
	
7. To test it on Video Provide the absolute Video path.<br>
	``` input_video_file_path = "/content/drive/MyDrive/Data/3.webm" ```
  

# Results

  

<img  align="left"  src="https://drive.google.com/uc?id=1aPDMU9XpAgjnldY8mzntDQI068GrL0JU"  height="300px"  width="47%"  right-margin="2px">
<img  alt="Fire Not Detected!"  src="https://drive.google.com/uc?id=1nEL6dA9qveYzmNf5NUPN6AILA2bCspQQ"  height="300px"  width="50%">
<pre>            Fire NOT detected                                                    Fire detected </pre>
<img  src="https://drive.google.com/uc?id=1R1HEACk0qtEF9dLhxdGAhMOyS4a4yXnE"  height="70%">
<pre>                                           Confusion Matrix                 </pre>
<hr>


## Group Members

* <b>Sumit Kumar Gupta </b><br>
	Roll No:- 1805232059<br>
	Mob No:- 6386040933<br>
	Email:- 1805232059@ietlucknow.ac.in<br>

* <b>Piyush Kumar Singh</b><br>
	 Roll No:- 1900520139002<br>
	 Mob No:- 8303985986<br>
	 Email:- 1900520139002@ietlucknow.ac.in<br>

* <b>Sahil Chaudhary </b><br>
	Roll No:- 1805213047<br>
	Mob No:- 8077684403<br>
	Email:- 1805213047@ietlucknow.ac.in<br><hr>
