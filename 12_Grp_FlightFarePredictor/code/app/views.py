from django.shortcuts import render
import pandas as pd
import pickle
import os

modulepath = os.path.dirname(__file__)
model = pickle.load(open(os.path.join(modulepath, 'flight_rf.pkl'), 'rb'))


def home(request):
    return render(request, 'app/index.html')


def test(request):
    # Date_of_Journey
    date_dep = request.POST.get("Dep_Time")
    Journey_day = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M").day)
    Journey_month = int(pd.to_datetime(
        date_dep, format="%Y-%m-%dT%H:%M").month)
    # print("Journey Date : ",Journey_day, Journey_month)

    # Departure
    Dep_hour = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M").hour)
    Dep_min = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M").minute)
    # print("Departure : ",Dep_hour, Dep_min)

    # Arrival
    date_arr = request.POST.get("Arrival_Time")
    Arrival_hour = int(pd.to_datetime(date_arr, format="%Y-%m-%dT%H:%M").hour)
    Arrival_min = int(pd.to_datetime(date_arr, format="%Y-%m-%dT%H:%M").minute)
    # print("Arrival : ", Arrival_hour, Arrival_min)

    # Duration
    dur_hour = abs(Arrival_hour - Dep_hour)
    dur_min = abs(Arrival_min - Dep_min)
    # print("Duration : ", dur_hour, dur_min)

    # Total Stops
    # print(request.POST.get("stops"))
    Total_stops = request.POST.get("stops")
    if Total_stops:
        Total_stops = int(Total_stops)
    # print(Total_stops)

    Jet_Airways = IndiGo = Air_India = Multiple_carriers = SpiceJet = Vistara = GoAir = Multiple_carriers_Premium_economy = Jet_Airways_Business = Vistara_Premium_economy = Trujet = 0
    airline = request.POST.get('airline')
    if(airline == 'Jet Airways'):
        Jet_Airways = 1
    elif (airline == 'IndiGo'):
        IndiGo = 1
    elif (airline == 'Air India'):
        Air_India = 1
    elif (airline == 'Multiple carriers'):
        Multiple_carriers = 1
    elif (airline == 'SpiceJet'):
        SpiceJet = 1
    elif (airline == 'Vistara'):
        Vistara = 1
    elif (airline == 'GoAir'):
        GoAir = 1
    elif (airline == 'Multiple carriers Premium economy'):
        Multiple_carriers_Premium_economy = 1
    elif (airline == 'Jet Airways Business'):
        Jet_Airways_Business = 1
    elif (airline == 'Vistara Premium economy'):
        Vistara_Premium_economy = 1
    elif (airline == 'Trujet'):
        Trujet = 1

    Source = request.POST.get("Source")
    s_Delhi = s_Kolkata = s_Mumbai = s_Chennai = 0
    if (Source == 'Delhi'):
        s_Delhi = 1
    elif (Source == 'Kolkata'):
        s_Kolkata = 1
    elif (Source == 'Mumbai'):
        s_Mumbai = 1
    elif (Source == 'Chennai'):
        s_Chennai = 1

    dest = request.POST.get("Destination")
    # print(dest)
    d_Cochin = d_Delhi = d_New_Delhi = d_Hyderabad = d_Kolkata = 0
    if (dest == 'Cochin'):
        d_Cochin = 1
    elif (dest == 'Delhi'):
        d_Delhi = 1
    elif (dest == 'New_Delhi'):
        d_New_Delhi = 1
    elif (dest == 'Hyderabad'):
        d_Hyderabad = 1
    elif (dest == 'Kolkata'):
        d_Kolkata = 1
    # print(Total_stops, airline, Source, dest)
    if date_dep >= date_arr:
        prediction_text = "Arrival date & time must be after the Departure!"
    elif Total_stops == None or airline == None or Source == None or dest == None:
        wrong = set()
        if Total_stops == None:
            wrong.add("Stopage")
        if airline == None:
            wrong.add("Airline")
        if Source == None:
            wrong.add("Source")
        if dest == None:
            wrong.add("Destination")
        prediction_text = "Please fill the values of "
        wrong_values = ",".join(list(wrong))
        prediction_text += wrong_values + ' correctly!'
    elif Source == dest:
        output = 0
        prediction_text = "Your predicted flight price from {} to {} is Rs. {}".format(
            Source, dest, output)
    else:
        prediction = model.predict([[
            Total_stops,
            Journey_day,
            Journey_month,
            Dep_hour,
            Dep_min,
            Arrival_hour,
            Arrival_min,
            dur_hour,
            dur_min,
            Air_India,
            GoAir,
            IndiGo,
            Jet_Airways,
            Jet_Airways_Business,
            Multiple_carriers,
            Multiple_carriers_Premium_economy,
            SpiceJet,
            Trujet,
            Vistara,
            Vistara_Premium_economy,
            s_Chennai,
            s_Delhi,
            s_Kolkata,
            s_Mumbai,
            d_Cochin,
            d_Delhi,
            d_Hyderabad,
            d_Kolkata,
            d_New_Delhi
        ]])

        output = prediction[0]
        adult = request.POST.get('adultcount')
        children = request.POST.get('childrencount')
        tickets = int(adult) + int(children)
        output *= tickets
        output = round(output, 2)

        prediction_text = "Your predicted flight price from {} to {} is Rs. {}".format(
            Source, dest, output)

    return render(request, 'app/index.html', {'prediction_text': prediction_text})
