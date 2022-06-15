

import time
start_time = time.time()


# Loading the dataset

import pandas as pd
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
import re


data = pd.read_csv("Amazon_Unlocked_Mobile1.csv")

data.head()
print("Decription of total reviews : ")
print (data['Reviews'].describe())
print()


# Filtering our dataset

data["Reviews"] = data["Reviews"].fillna("")

data_sorted = data[data["Reviews"].apply(lambda x: len(x.split())>4)]
data_sorted = data_sorted[data_sorted['Review Votes'].apply(lambda x:x>0 )]

data_sorted.head()



# Searching for a specific brand's reviews

data_sorted = data_sorted[data_sorted['Brand Name'].apply(lambda x: x=='Samsung')]
print("Number of Samsung products : ", data_sorted.shape[0])

data_sorted.head()

print("Description of Samsung brand's reviews :")
print(data_sorted['Reviews'].describe())
print()



# Cleaning and Preprocessing

data_sorted.sort_values('Reviews' ,inplace=True , ascending=False)

indices = []
for i in data_sorted['Reviews']:
    indices.append(i)
#print(len(indices))

for line in indices:
    line=re.sub(r'(?<=[.,])(?=[^\s])', r'  ', line)

indices.sort()


from itertools import groupby
mobile_review = []
mobile_review = [i[0] for i in groupby(indices)]
print("Number of reviews after removing duplicates : ", (len(mobile_review)))

sentence_1=[]

sentence_to_word= []
for s in mobile_review:
    sentence_1.append(sent_tokenize(s))

sentence_1=[y for x in sentence_1 for y in x]
# print("After tokenizing : ", (len(sentence_1)))

sentence_1=[]

sentence_to_word= []
for s in mobile_review:
    sentence_1.append(sent_tokenize(s))

sentence_1=[y for x in sentence_1 for y in x]
# print("After tokenizing :", (len(sentence_1)))

stop_words = set(stopwords.words("english"))

sentences = []
for i in sentence_1:
    string = ""
    for words in i.split():
        # Removing the special chars in reviews
        word = ("".join(e for e in words if e.isalpha()))
        word = word.lower()
        # Stopwords removal
        if not word in stop_words:
            string += word+" "
    sentences.append(string)

# print (len(sentences))
for s in sentences:
    sentence_to_word.append(word_tokenize(s))
    
    
      
# Extracting reviews with special features (here we've taken camera and battery as features)

#camera_set = set(["camera" "selfie", "Camera" ,"light", "daylight","blur", "photo", "photos", "clarity", "image", "Images","zoom","focus", "pic", "pics"])

battery_set = set(["battery","long life", "charging","too slow", "long lasting", "charges", "durable","battery life","lasting"])

#screen_set = set(["screen","display","resolution","stylish","dimension","view","clear","appearance","touch","glass"])


sent_extracted=[]
for i in range(len(sentences)):
    count=0
    for w in sentence_to_word[i]:
        if w in battery_set:
            count += 1
            break;
    if(count>0 ):
        sent_extracted.append(sentence_1[i])

print("Total reviews related to the specific feature chosen : ", len(sent_extracted))
print()


# Sentiment analysis using TextBlob 

from textblob import TextBlob
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA
sid = SIA()


senti=[]
for s in sent_extracted:
    scores = sid.polarity_scores(s)
    senti.append(scores)

sub={}
j=0
for i in sent_extracted:
    blob1 = TextBlob(i)
    sub[j] =(format(blob1.sentiment[1]))
    j += 1

max = 0
for i in range (0,len(senti)-1):
    if senti[i]['compound'] > senti[i+1]['compound']:
        max=senti[i]['compound']

senticompound={}
for i in range(0,len(senti)):
    senticompound[i] = senti[i]['compound']

product = {}
sum1= 0
for i in range(0,len(senti)):
    product[i]=senticompound[i]*float(sub[i])
    sum1 +=senticompound[i]


import operator

neutral_sentences = 0
negative_sentences = 0
positive_sentences = 0

for value in product.values():
    if (value==0):
        neutral_sentences += 1
    elif (value<0):
        negative_sentences += 1
    else:
        positive_sentences += 1
        
print("Neutral sentences : ",neutral_sentences  )
print("Negative_sentences : ",negative_sentences)
print("Positive_sentences : ",positive_sentences)
print()
print("Accuracy of the sentiment analyzer in percentage (%) : ",(negative_sentences + positive_sentences)*100/len(sent_extracted))


sorted_x = sorted(product.items(), key=operator.itemgetter(1))

if sum1>=0:
    m2=len(senti)-1
    m1=m2-50

n1=0
n2=50

negative_sent=[]
positive_sent=[]
for i in range(n1, n2):
       # Negative reviews
       j= sorted_x[i][0]
       negative_sent.append(sent_extracted[j])

for i in range(m1,m2):
      # Positive reviews
      j=sorted_x[i][0]
      positive_sent.append(sent_extracted[j])



# Summarizing the Negative reviews

import numpy as np

Nword_embeddings = {}

f = open('glove.6B.100d.txt', encoding='utf-8')

for line in f:
    values = line.split()
    word = values[0]
    coefs = np.asarray(values[1:], dtype=np.float32)
    Nword_embeddings[word] = coefs
    
f.close()

Nsentence_vectors = []

for i in negative_sent:
    if len(i) !=0:
        v=0
        for w in i.split():
            Xlen= len(i.split())
            v=v+Nword_embeddings.get(w,np.zeros((100,)))
            v=v/(Xlen+0.001)
    else:
        v = np.zeros((100, ))
    Nsentence_vectors.append(v)



# Similarity Matrix

Nsim_mat = np.zeros([len(negative_sent),len(negative_sent)])
from sklearn.metrics.pairwise import cosine_similarity

for i in range(len(negative_sent)):
    for j in range(len(negative_sent)):
        if i!=j:
            Nsim_mat[i][j]= cosine_similarity(Nsentence_vectors[i].reshape(1,100), Nsentence_vectors[j].reshape(1,100))[0,0]

import networkx as ny
ny_graph = ny.from_numpy_array(Nsim_mat)
NScores = ny.pagerank(ny_graph)

Nranked_sentences = sorted(((NScores[i],s) for i,s in enumerate(negative_sent)), reverse=True)



# Extracting top 10 Negative reviews as the summary

print()
print("TOP 10 NEGATIVE REVIEWS SUMMARY : -------------->")
print()

for i in range(10):
    print (Nranked_sentences[i][1])
    
print("*********************************************************************************")   



# Summarizing the Positive Reviews

word_embeddings = {}

f= open('glove.6B.100d.txt', encoding='utf-8')

for line in f:
    values = line.split()
    word = values[0]
    coefs = np.asarray(values[1:], dtype='float32')
    word_embeddings[word] = coefs
    
f.close()

sentence_vectors = []

for i in positive_sent:
    if len(i) != 0:
        v=0
        for w in i.split():
            xlen = len(i.split())
            v=v+word_embeddings.get(w, np.zeros((100, )))
            v=v/(xlen+0.001)
    else:
        v = np.zeros((100,))
    
    sentence_vectors.append(v)



# Similarity Matrix
    
sim_mat = np.zeros([len(positive_sent), len(positive_sent)])

from sklearn.metrics.pairwise import cosine_similarity

for i in range(len(positive_sent)):
    for j in range(len(positive_sent)):
        if i != j:
            sim_mat[i][j] = cosine_similarity(sentence_vectors[i].reshape(1,100), sentence_vectors[j].reshape(1,100))[0,0]

import networkx as nx

nx_graph = nx.from_numpy_array(sim_mat)
scores = nx.pagerank(nx_graph)

ranked_sentences=sorted(((scores[i],s) for i,s in enumerate(positive_sent)), reverse=True)



# Extracting the top 10 Positive Reviews as the summary

print()
print("TOP 10 POSITIVE REVIEWS SUMMARY :-------------->")
print()

for i in range(10):
    print (ranked_sentences[i][1])
        
print("**************************************************************************************")  

print()
print("Execution time of program is %s seconds" %(time.time() - start_time))
print()
