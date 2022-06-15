from django.shortcuts import render
#from django.http import HttpResponse
import numpy as np
#import pickle

import joblib

reloadModel=joblib.load('./models/heart-disease-prediction-knn-model.pkl')

# Create your views here.
def index(request):
    context = {'Sachin':1}
    return render(request, "index.html", context)
    #return HttpResponse('The main page')

def Prediction(request):
    if request.method == 'POST':
        
        age = request.POST.get('age')
        sex = request.POST.get('sex')
        cp = request.POST.get('cp')
        trestbps = request.POST.get('trestbps')
        chol = request.POST.get('chol')
        fbs = request.POST.get('fbs')
        restecg = request.POST.get('restecg')
        thalach = request.POST.get('thalach')
        exang = request.POST.get('exang')
        oldpeak = request.POST.get('oldpeak')
        slope = request.POST.get('slope')
        ca = request.POST.get('ca')
        thal = request.POST.get('thal')
        
        data = np.array([[age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal]])
        my_prediction = reloadModel.predict(data)
        
        context = {'my_prediction':my_prediction}
        
        return render(request, 'result.html', context)