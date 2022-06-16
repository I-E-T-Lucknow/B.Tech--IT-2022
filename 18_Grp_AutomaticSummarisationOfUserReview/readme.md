
# Automatic Summarization of User Reviews - IET Lucknow

Being able to automatically summaries data in a world where the internet is exploding with massive amounts of data every day is a significant issue.
Summaries of extensive papers, news items, and even discussions can speed up and improve our material consumption. Automatic Text Summarizations 
has seen a substantial interest in Natural Language Processing (NLP) that has garnered a lot of attention in recent years. 
The collection and transmission of massive volumes of data have parachuted into our society today. 

As internet allows users to interact more, customer reviews posted on the web have experienced significant growth in the recent years.
Large number of customer reviews posted on sites like amazon.com make it difficult for marketers and buisness analyst to understand customer concerns.
In this report, we describe an approach to automatically summarize customer reviews and present the prelimanary results of our research on product reviews
listed on amazon.com . It often results in high accuracy in extracting phrases from noisy customer reviews.

Our final year project, done under the guidance of Dr. Parul Yadav and Dr. Aditi Sharma is based on the Text summarization. 
We have  combined the features of TextBlob (subjectivity) and Vader(compound)  for Sentiment analysis, Glove model for word embeddings and a TextRank Algorithm to decide the most important sentences in the text and.

This project summarizes the text along with with identifying the sentiments of user. It separates those sentiments into sets of 
negative and positive and then ranks the sentences accordingly. 


## Installation

Make sure you have brew installed on your system. If not, follow the steps [here](https://brew.sh) to do so.

- Install Python 3.6.x or higher on your system.

    ```
      brew install python@3
    ```

- Update your path variables accordingly

    ```
      export PATH="/usr/local/opt/python@2/libexec/bin:$PATH"
    ```
- Install any code editor(sublime, vs code etc)

- Clone the project (or copy the folder to your local)

    ``` 
      git clone https://www.github.com/link-to-project.git
    ```

- Go to the project directory

    ```
      cd my-project
    ```

- Install dependencies

    ```
       Install NLTK : pip install --user -U nltk
       Install Numpy : pip install --user -U numpy
       Install Pandas : pip intall --user -U Pandas
       Install Textblob : pip install -U textblob python -m textblob.download_corpora
       Install Vader : pip install vaderSentiment
       Install time : pip install python-time
       
       To convert sentences similarity matrix into graph and rank those sentences with Text Rank 
       
       Install Networkx : pip install networkx 
       
    ```
 - Downloading dataset files
    
    [Dataset - Amazon_Unlocked_Mobile.csv ](https://www.kaggle.com/datasets/PromptCloudHQ/amazon-reviews-unlocked-mobile-phones/download)
 
    [Glove Model - glove.6B.100d.txt](https://www.kaggle.com/datasets/danielwillgeorge/glove6b100dtxt/download)
 
    Store these files with  MajorProject_FinalCode.py
    
    
Now, the project is ready to run.

## Run Locally

After following the above steps for installation, type the command below to run the project.

  ```Terminal
    python MajorProject_FinalCode.py
  ```
  
The project is running now.


## Tech Stack

**Language:** Python

**Libraries:** NLTK, Textblob, Vader, NumPy, Pandas, Networkx

## Algorithm used

**TextRank:**  To Rank Sentences according to its importance in text, based on Google Page Rank Algorithm.

**Glove Model:** To Create Word Embeddings. We've used Stanford's GloVe 100d word embeddings for our project.


## Authors

- Shubham Singh (B.Tech. IT-2022 - 1705213045) [[LinkedIn](https://www.linkedin.com/in/shubham-singh-15a175160/), [GitHub](https://www.github.com/shubhaml1)]
- Durgesh (B.Tech. IT-2022 - 1705213026) [[LinkedIn](https://www.linkedin.com/in/durgesh-kushwah-b57b50151/)]
- Harsh Kumar (B.Tech. IT-2022 - 1900520139001) [<a href="mailto:1900520139001@ietlucknow.ac.in">Email</a>]

