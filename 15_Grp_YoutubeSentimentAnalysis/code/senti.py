#from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
def second():
    analyzer=SentimentIntensityAnalyzer()
    pos_count=0
    pos_correct=0

    file= open(r"C:\Users\user\Desktop\projects\input.txt","r")

    with file as f:
        for line in f.read().split('\n'):
            analysis=analyzer.polarity_scores(line) 
            if analysis['compound'] > 0.5:
                pos_correct+=1
            pos_count+=1
        file.close()
    file1= open(r"C:\Users\user\Desktop\projects\input.txt","r")
    neg_count=0
    neg_correct=0

    with file1 as f:
        for line in f.read().split('\n'):
            analysis=analyzer.polarity_scores(line)
            if analysis['compound'] <= 0.5:
                neg_correct+=1
            neg_count+=1
        file1.close()
    p=(pos_correct/pos_count*100.0,pos_count)
    n=(neg_correct/neg_count*100.0,neg_count)

    if(p>n):
        return ("Video is positive",analysis['compound'])
    else:
        return ("Video is negative",analysis['compound'])
