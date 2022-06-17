# FLIGHT FARE PREDICTOR [(link)](https://flight-farepredictor.herokuapp.com/)

## College Project

## DATA ANALYSIS
A machine learning project which predicts the fare of the flight from one city to another. This project is a single page application and uses algorithm of ***Random Forest Regression.*** The page has beautifully designed form in which has many fields(such as Source, Destination, stopages, airlines, dates, etc.) to fill which is required in the prediction.

## Some major points on algorithm used:
* Random forest is a Supervised Learning algorithm which uses ensemble learning method for classification and regression.
* Decision trees are sensitive to the specific data on which they are trained. If the training data is changed the resulting decision tree can be quite different and in turn the predictions can be quite different.Also Decision trees are computationally expensive to train, carry a big risk of overfitting, and tend to find local optima because they can’t go back after they have made a split.To address these weaknesses, we turn to Random Forest.
* ![alt text](https://github.com/I-E-T-Lucknow/B.Tech--IT-2022/blob/main/12_Grp_FlightFarePredictor/random_forest.png?raw=true)

## Some major points on project:
1. It is a single page application.
2. The required fields are sent through the POST request after filling the form. At the backend , I have used django to receive all the data and filtered it and sent it to the model.
3. Initially the model is trained on the training data. The data is manipulated as:
    * Nan values are removed.
    * Exploratory Data Analysis(EDA) is done on the data. like the Date of Journey object data type is converted to datetime dtype.
    * All the object data type values are separated out one by one and converted to suitable values.
    * Categorical datas are handled by using ***OneHotEncoding and LabelEncoders.***
4. The data is trained using Random Forest Regression technique:
    * To ensures that the ensemble model does not rely too heavily on any individual feature, and makes fair use of all potentially predictive features, ***Hyperparameter Tuning*** is done.
    * Each tree draws a random sample from the original data set when generating its splits, adding a further element of randomness that prevents overfitting.
5. Visualization is done by using Seaborn.


## Technologies Used
```
Python
Pandas
Numpy
Matplotlib
Scikit-learn
Seaborn
django
HTML
CSS
Javascript
pickle
```

## Project setup
```
pip install django
django-admin startproject 'project_name'
```

### Compiles and hot-reloads for development
```
python manage.py runserver
```

## Production link
[https://flight-farepredictor.herokuapp.com/](https://flight-farepredictor.herokuapp.com/)

## ML Algorithms Implementation
Abhishek Jaiswal

## Backend
Neeraj Sharma

## Designs
Niharika Chaudhary

