# Sign Language Detection - IET LUCKNOW

American sign language is a predominant sign language Since the only disability D&M people have is communication related and they cannot use spoken languages hence the only way for them to communicate is through sign language.

Communication is the process of exchange of thoughts and messages in various ways such as speech, signals, behavior and visuals.

Deaf and Mute(Dumb)(D&M) people make use of their hands to express different gestures to express their ideas with other people.

Gestures are the nonverbally exchanged messages and these gestures are understood with vision. This nonverbal communication of deaf and dumb people is called sign language.

Sign language is a visual language and consists of 3 major components

![components](https://user-images.githubusercontent.com/97048757/173686776-2706c8b3-d7fd-4586-a2fe-45dc6594eb25.jpeg)

In this project I basically focus on producing a model which can recognize Fingerspelling based hand gestures in order to form a complete word by combining each gesture.

The gestures I trained are as given in the image below.

![signs](https://user-images.githubusercontent.com/97048757/173686856-0215ed82-ee41-422c-a3d2-b338bc652c40.jpeg)

# Libraries Requirements -(Requires the latest pip version to install all the packages)

Note : Python 3 is required to build this project, as some of the libraries required can't be installed on the lastest version of the Python

``` 
1. Lastest pip -> pip install --upgrade pip

2. numpy -> pip install numpy

3. string -> pip install strings

4. os-sys -> pip install os-sys

5. opencv -> pip install opencv-python

6. tensorFlow -> i) pip install tensorflow 
                 ii) pip3 install --upgrade https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-0.8.0-cp34-cp34m-linux_x86_64.whl

7. keras -> pip install keras

8. tkinter -> pip install tk

9. PIL -> pip install Pillow

10. enchant -> pip install pyenchant (Python bindings for the Enchant spellchecking system)

11. hunspell -> pip install cyhunspell (A wrapper on hunspell for use in Python)

12. gTTS -> pip install gTTS (A Python library and CLI tool to interface with Google Translate's text-to-speech API.) 

```
# Machine Learning Model Used

* Image Processing: Gaussian Blur Filter, OpenCV
* Symbol Recognisation: Convulation Neural Network (CNN), Used two layer architecture for better for better recognisation
* Speech Generation: Used gTTS (Google Translate's text-to-speech API) for this purpose.

# Running the Project

```
python /path/to/the/app.py
```

#Authors
* Prakhar Pandey (B.Tech IT 2022, 1805213039) (Resume, Linkedln, Github)
* Aditya Kumar Garg (B.Tech IT 2022, 1805213005) (Resume, Linkedln, Github)
* Atharv Pandey (B.Tech IT 2022, 1805213017) (Resume, Linkedln, Github)

