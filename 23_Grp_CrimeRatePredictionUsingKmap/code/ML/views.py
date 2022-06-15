from django.shortcuts import render
#from django.http import HttpResponse
import numpy as np
import pickle
import pandas as pd

import joblib

reloadModel=joblib.load('./models/Crim_Pred.pkl')

# Create your views here.
def index(request):
    context = {'Sachin':1}
    return render(request, "index.html", context)
    #return HttpResponse('The main page')

def Prediction(request):
    if request.method == 'POST':
        
        lat = request.POST.get('lat')
        long = request.POST.get('long')
        day = request.POST.get('day')
        month = request.POST.get('month')
        year = request.POST.get('year')
        hour = request.POST.get('hour')
        min = request.POST.get('min')
        sec = request.POST.get('sec')

        
        my_prediction = int(month)
        data = np.array([day,month,year,hour,min,sec,lat,long])
        data= data.reshape(1,-1)        

       
       # my_prediction = reloadModel.predict(data)
        
        context = {'my_prediction':my_prediction}
        
        return render(request, 'result.html', context)