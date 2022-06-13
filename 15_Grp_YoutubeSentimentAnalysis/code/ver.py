import moviepy.editor as mp
import speech_recognition as sr
from os import path

def first(file_path):
    clip = mp.VideoFileClip(file_path).subclip(0,45)
    clip.audio.write_audiofile("theaudio.wav")


    AUDIO_FILE = path.join(path.dirname(path.realpath(__file__)), "theaudio.wav")
    r=sr.Recognizer()
    with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)
    try:
        file=open(r"C:\Users\user\Desktop\projects\input.txt","w+")
        k=str(r.recognize_google(audio,language="en-US"))
        file.write(k)
        print(k)
        file.close()    
        return k
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition       service; {0}".format(e))
