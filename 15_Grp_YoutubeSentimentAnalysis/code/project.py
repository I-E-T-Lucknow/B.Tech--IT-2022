from tkinter import *
from ver import first
from senti import second
global k
def printtext():
    global e
    string=e.get()
    l=first(string)
    k=second()
    root=Tk()
    root.geometry("500x100+300+300")
    label = Message(root, text=l, width=500, relief=RAISED)
    label.pack()
    label=Message(root,text=k,width=100,relief=RAISED)
    label.pack()
    root.mainloop()

top=Tk()
top.geometry("500x100+300+300")
top.title('Video sentimental analyser')
label = Message(top, text="Enter path", width=100, relief=RAISED)
label.pack()
e=Entry(top,width=50)
e.pack()
b=Button(top,text='Processing',command=printtext)
b.pack(side = "bottom")

top.mainloop()
