# Detection of Human in Fire Using HOG and SVM

<div  align="center"  right-margin="3px">
<img  height="50%"  width="70%"  src="https://drive.google.com/uc?id=1RL4o86LzwSUdO8FYvBVYtgxrHhoNa_PZ"  height="300px"  border-radius="5px">
</div>
<div  left-margin="2px"  align="justify">
The project helps detect the humans who are stuck in fire and are usually not visible to the eyes due to high smoke and flame. The project can be broken down into two merging segments - the first is detecting the Fire, and the second is detecting the human. The fire detection algorithm detects the Fire and flames in the environment if present; the module works based on colour format YCbCr. It uses a Histogram of Oriented Gradient(HOG) and Support Vector Machine(SVM) to detect a human in the Fire. It evaluates several motion-based feature sets for human detection in the form of videos.
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

  
  

## Steps to run the project

1. Download the Dataset.

2. Extract the feature using HOG function and save that features in a separate folder named features

2.1 Postive feature in pos_mod

2.2 negative feature in neg_mod

3. Train the model using the extracted features and save the model as svm.xml in models folder.

4. Load the Model from the model folder and test it on various images or videos.

  

# Results

  

<img  align="left"  src="https://drive.google.com/uc?id=1aPDMU9XpAgjnldY8mzntDQI068GrL0JU"  height="300px"  width="47%"  right-margin="2px">
<img  alt="Fire Not Detected!"  src="https://drive.google.com/uc?id=1nEL6dA9qveYzmNf5NUPN6AILA2bCspQQ"  height="300px"  width="50%">
<pre>. Fire NOT detected                                     Fire detected </pre>
<img  src="https://drive.google.com/uc?id=1R1HEACk0qtEF9dLhxdGAhMOyS4a4yXnE"  height="70%">
<pre>                                 Confusion Matrix                 </pre>
<hr>


## Group Members

* <b>Sumit Kumar Gupta </b>
	Roll No:- 1805232059
	Mob No:- 6386040933
	Email:- 1805232059@ietlucknow.ac.in

* <b>Piyush Kumar Singh</b>
	 Roll No:- 1900520139002
	 Mob No:- 8303985986
	 Email:- 1900520139002@ietlucknow.ac.in

* <b>Sahil Chaudhary </b>
	Roll No:- 1805213047
	Mob No:- 8077684403
	Email:- 1805213047@ietlucknow.ac.in