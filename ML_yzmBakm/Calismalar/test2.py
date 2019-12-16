import pandas as pd
import matplotlib.pyplot as plt


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



print([1169,67,1,2,1])
print (ScaledCustomerVals([1169,67,1,2,1]))
