import time
import urllib.request, json
import pandas as pd
import matplotlib.pyplot as plt
import pickle
from datetime import datetime


def Scaling():
    kredi_dataset=pd.read_csv("krediVeriseti2.csv",delimiter=r",");
    kredi_dataset['evDurumu'] = kredi_dataset['evDurumu'].replace(['kiraci','evsahibi'],[0,1])
    kredi_dataset['telefonDurumu'] = kredi_dataset['telefonDurumu'].replace(['yok','var'],[0,1])
    kredi_dataset['KrediDurumu'] = kredi_dataset['KrediDurumu'].replace(['verme','krediver'],[0,1])
    max_kM=kredi_dataset["krediMiktari"].max();
    min_kM=kredi_dataset["krediMiktari"].min();
    max_yas=kredi_dataset["yas"].max();
    min_yas=kredi_dataset["yas"].min();
    max_aks=kredi_dataset["aldigi_kredi_sayi"].max();
    min_aks=kredi_dataset["aldigi_kredi_sayi"].min();
    return [max_kM,min_kM,max_yas,min_yas,max_aks,min_aks]
scaleVals=Scaling();
max_krediMiktari=scaleVals[0]
min_krediMiktari=scaleVals[1]
max_yas=scaleVals[2]
min_yas=scaleVals[3]
max_aldigi_kredi_sayi=scaleVals[4]
min_aldigi_kredi_sayi=scaleVals[5]
print("Scale Values Of Dataset Calculated")
print("************************")
time.sleep(2)

def ScaledCustomerVals(values):
    scaledKM=(values[0]-min_krediMiktari)
    scaledKM=scaledKM/(max_krediMiktari-min_krediMiktari)
    scaledKM=round(scaledKM, 8)
    values[0]=scaledKM
    
    scaledYas=(values[1]-min_yas)
    scaledYas=scaledYas/(max_yas-min_yas)
    scaledYas=round(scaledYas, 8)
    values[1]=scaledYas

    scaledAKS=(values[3]-min_aldigi_kredi_sayi)
    scaledAKS=scaledAKS/(max_aldigi_kredi_sayi-min_aldigi_kredi_sayi)
    scaledAKS=round(scaledAKS, 8)
    values[3]=scaledAKS

    return values



def PrintAccountDetails(account):
    detail=str(account['AccountId'])+"-->"+account['AccountNo']+" : "+str(account['AccountBalance'])
    detail=mylib.printName("orcun")+detail
    return (detail)


def Predict(predReq):
    
    ID=int(predReq['ID'])
    CustomerId = int(predReq['CustomerId'])
    CreditAmount = float(predReq['CreditAmount'])
    Age = int(predReq['Age'])
    OwnHouse = int(predReq['OwnHouse'])
    CreditCount = int(predReq['CreditCount'])
    OwnPhone = int(predReq['OwnPhone'])
    Result = int(predReq['Result'])
    Isread = int(predReq['Isread'])
    DateOfCreate =  predReq['DateOfCreate']
    scaledValues=ScaledCustomerVals([CreditAmount,Age,OwnHouse,CreditCount,OwnPhone])


    print("New Prediciton Request : ",CreditAmount,Age,OwnHouse,CreditCount,OwnPhone)
    Result=loaded_model.predict([scaledValues])
    print("Prediction Result : ",Result)
    myurl="http://www.orcunozdil.site/Update.aspx?p1=0&p2="+str(ID)+"&p3="+str(Result[0])
    
    with urllib.request.urlopen(myurl) as url:
        updateResult = (url.read().decode())
        print("Update Succes:",str(updateResult))
    return




def GetNewPredictionRequests():
    print("\n\n*************New Query("+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+")***************")
    with urllib.request.urlopen("http://www.orcunozdil.site/List.aspx") as url:
        listOfPredictionRequests = json.loads(url.read().decode())      
       
        for predReq in listOfPredictionRequests:
            Result = predReq['Result']
            if Result=="-1":
                Predict(predReq)

    print("*************End of Query("+datetime.now().strftime("%d/%m/%Y %H:%M:%S")+")***************")
  
def LoadModel():
    filename = 'dectree.sav'
    global loaded_model
    loaded_model = pickle.load(open(filename, 'rb'))
    print("Prediction Model Loaded")
    print("************************")
    time.sleep(2)
  

def ListenDatabase():
    while True:
        try:
            GetNewPredictionRequests()               
        except:
            print("An exception occurred,no internet connection")
        time.sleep(10)
        

def Greeting():
    print("Credit Predictor Is Listening")
    print("************************\n\n\n")
    time.sleep(2)



LoadModel()
Greeting()
ListenDatabase()


