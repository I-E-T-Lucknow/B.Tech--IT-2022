#Movie Recommendation System

This is the code for building a recommendation system based on content based filtering and collaborative filtering using K nearest neighbour model.

###Overview

There are basically 3 types of recommendation algorithms

Content based filtering - Find Products with 'similar' attributes
Collaborative filtering - Find Products liked by 'similar' users
Hybrid filtering - Find product based on both of above mentioned

This recommendation is however based on hybrid  filtering which uses easily captured user behaviour data. 
The rating data is represented using a matrix where users are along the rows and products are along the columns. Blank Cells represent the ratings for unseen products.
There are different methods to fill the blank cells like nearest neighbour model, latent factor analysis, etc.by using values which are already filled in rating matrix.
However, we will use Neareset neighbour model which measures similarity of users using distance metrics.

###Dependencies

*scipy
*pandas
*numpy

###Usage

*Clone my repository.
*Open CMD in working directory.
*Run following command.
*pip install -r requirements.txt
*App.py is the main Python file of Streamlit Web-Application.
*To run app, write following command in CMD. or use any IDE.
*streamlit run App.py
*Movie-recommendation.ipynb is the notebook of data processing.

###Authors

####1.Apoorv Bansal,IT,2022 Batch, apoorv95.ab@gmail.com, 7042248410
####2.Uttam Singh,IT, 2022 Batch, ut6097@gmail.com, 9718774802
####3.Vanshika Gupta, IT, 2022 Batch, vanshikagupta554@gmail.com, 8707741291
