import pandas as pd
import matplotlib.pyplot as plt
import pickle

kredi_dataset=pd.read_csv("krediVeriseti2.csv",delimiter=r",");
#print(kredi_dataset['KrediDurumu'].unique())

#evDurumu kolonunu kiraci-evsahibi 'nden 0 ve 1' e döndürüyoruz
kredi_dataset['evDurumu'] = kredi_dataset['evDurumu'].replace(['kiraci','evsahibi'],[0,1])

#telefonDurumu kolonunu yok-var 'dan 0 ve 1' e döndürüyoruz
kredi_dataset['telefonDurumu'] = kredi_dataset['telefonDurumu'].replace(['yok','var'],[0,1])

#KrediDurumu kolonunu verme-krediver 'den 0 ve 1' e döndürüyoruz
kredi_dataset['KrediDurumu'] = kredi_dataset['KrediDurumu'].replace(['verme','krediver'],[0,1])



import seaborn as sns
sns.countplot(kredi_dataset['KrediDurumu'],label="Count")




kredi_dataset.plot(kind='box', subplots=True, layout=(2,3),sharex=False,sharey=False,figsize=(9,9),
                   title='Kolonlar')


import pylab as pl
kredi_dataset.hist()


#plt.show()


feature_names={'krediMiktari','yas','evDurumu','aldigi_kredi_sayi','telefonDurumu'}
X=kredi_dataset.drop('KrediDurumu', 1)
y=kredi_dataset['KrediDurumu']
print(X)

from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test = train_test_split(X,y,random_state=0)


from sklearn.preprocessing import MinMaxScaler
scaler=MinMaxScaler();
X_train=scaler.fit_transform(X_train)
X_test=scaler.fit_transform(X_test)



filename = 'logreg.sav'
loaded_model = pickle.load(open(filename, 'rb'))


#print(X.head)
#for x in range(len(X_test)):
    
#print(str([X_test[0]])+"-->"+str(loaded_model.predict([X_test[0]])))




    
#result = loaded_model.score(X_test, y_test)
#print(X_test)
#print(y_test.to_string())
#print(result)
