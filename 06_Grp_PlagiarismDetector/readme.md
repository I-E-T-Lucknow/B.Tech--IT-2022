# Plagiarism Detection Model, Machine Learning Deployment

- **Model : SVM Classification Model and PyTorch LSTM Model**
- **Accuracy : 1.0**

This repository contains code and associated files for deploying a plagiarism detector using AWS SageMaker.

## Problem Statement and Dataset

Plagiarism is widely acknowledged to be a significant and increasing problem for higher education institutions. A wide range of solutions, including several commercial systems, have been proposed to assist the educator in the task of identifying plagiarised work, or even to detect them automatically. Direct comparison of these systems is made difficult by the problems in obtaining genuine examples of plagiarised student work. We describe our initial experiences with constructing a corpus consisting of answers to short questions in which plagiarism has been simulated. This corpus is designed to represent types of plagiarism that are not included in existing corpora and will be a useful addition to the set of resources available for the evaluation of plagiarism detection systems.'

This project is based on Clough, P. and Stevenson, M. (2021) Developing a corpus of plagiarised short answers. Language Resources and Evaluation.

## Project Overview

In this project, you will be tasked with building a plagiarism detector that examines a text file and performs binary classification; labeling that file as either *plagiarized* or *not*, depending on how similar that text file is to a provided source text. Detecting plagiarism is an active area of research; the task is non-trivial and the differences between paraphrased answers and original work are often not so obvious.




## Feature Engineering

Let's talk a bit more about the features we want to include in a plagiarism detection model and how to calculate such features. In the following explanations, I'll refer to a submitted text file as a **Student Answer Text (A)** and the original, wikipedia source file (that we want to compare that answer to) as the **Wikipedia Source Text (S)**.

### 1. Containment Features

Your first task will be to create **containment features**. To understand containment, let's first revisit a definition of [n-grams](https://en.wikipedia.org/wiki/N-gram). An *n-gram* is a sequential word grouping. For example, in a line like "bayes rule gives us a way to combine prior knowledge with new information," a 1-gram is just one word, like "bayes." A 2-gram might be "bayes rule" and a 3-gram might be "combine prior knowledge."

> Containment is defined as the **intersection** of the n-gram word count of the Wikipedia Source Text (S) with the n-gram word count of the Student  Answer Text (S) *divided* by the n-gram word count of the Student Answer Text.

$$ \frac{\sum{count(\text{ngram}_{A}) \cap count(\text{ngram}_{S})}}{\sum{count(\text{ngram}_{A})}} $$

If the two texts have no n-grams in common, the containment will be 0, but if _all_ their n-grams intersect then the containment will be 1. Intuitively, you can see how having longer n-gram's in common, might be an indication of cut-and-paste plagiarism. In this project, it will be up to you to decide on the appropriate `n` or several `n`'s to use in your final model.


### 2. Longest Common Subsequence

Containment a good way to find overlap in word usage between two documents; it may help identify cases of cut-and-paste as well as paraphrased levels of plagiarism. Since plagiarism is a fairly complex task with varying levels, it's often useful to include other measures of similarity. The paper also discusses a feature called **longest common subsequence**.

> The longest common subsequence is the longest string of words (or letters) that are *the same* between the Wikipedia Source Text (S) and the Student Answer Text (A). This value is also normalized by dividing by the total number of words (or letters) in the  Student Answer Text. 





This project will be broken down into three main notebooks:

**Notebook 1: Data Exploration** 
* Load in the corpus of plagiarism text data.
* Explore the existing data features and the data distribution.
* This first notebook is **not** required in your final project submission.

**Notebook 2: Feature Engineering** 
* Clean and pre-process the text data.
* Define features for comparing the similarity of an answer text and a source text, and extract similarity features.
* Select "good" features, by analyzing the correlations between different features.
* Create train/test `.csv` files that hold the relevant features and class labels for train/test data points.

**Notebook 3: Train and Deploy Your Model in SageMaker** 

* Upload your train/test feature data to S3.
* Define a binary classification model and a training script.
* Two Models: SVM Classification Model and PyTorch Model
* Train your model and deploy it using SageMaker.
* Evaluate your deployed classifier.


Authors
RITIK KUMAR GUPTA (B.Tech. IT-2022 - 1805220046) [LinkedIn](https://www.linkedin.com/in/ritik-gupta-92518617b/)
RITIK KUMAR (B.Tech. IT-2022 - 1805213045) 
SHUBHAM KUMAR (B.Tech. IT-2022 - 1805213055) 

---
