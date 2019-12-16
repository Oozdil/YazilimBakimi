import pandas as pd
import matplotlib.pyplot as plt

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


plt.show()


feature_names={'krediMiktari','yas','evDurumu','aldigi_kredi_sayi','telefonDurumu'}
X=kredi_dataset.drop('KrediDurumu', 1)
y=kredi_dataset['KrediDurumu']


from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test = train_test_split(X,y,random_state=0)


from sklearn.preprocessing import MinMaxScaler
scaler=MinMaxScaler();
X_train=scaler.fit_transform(X_train)
X_test=scaler.fit_transform(X_test)



#Logistic regression
################################
from sklearn.linear_model import LogisticRegression
logreg=LogisticRegression()
logreg.fit(X_train,y_train)
print('Accuracy of Logistic Regresion classifier on training set: {:.2F}'
      .format(logreg.score(X_train,y_train)))
print('Accuracy of Logistic Regresion classifier on test set: {:.2F}'
      .format(logreg.score(X_test,y_test)))
#Logistic regression



#Decision tree
################################
from sklearn.tree import DecisionTreeClassifier
clf=DecisionTreeClassifier().fit(X_train,y_train)
print('Accuracy of Decision Tree Classifier on training set: {:.2F}'
      .format(clf.score(X_train,y_train)))
print('Accuracy of Decision Tree Classifier on test set: {:.2F}'
      .format(clf.score(X_test,y_test)))
#Decision tree



#KNN Classifier
################################
from sklearn.neighbors import KNeighborsClassifier
knn=KNeighborsClassifier()
knn.fit(X_train,y_train)
print('Accuracy of K-NN Classifier on training set: {:.2F}'
      .format(knn.score(X_train,y_train)))
print('Accuracy of K-NN Tree Classifier on test set: {:.2F}'
      .format(knn.score(X_test,y_test)))
#KNN Classifier


#NaiveBayes
################################
from sklearn.naive_bayes import GaussianNB
gnb=GaussianNB()
gnb.fit(X_train,y_train)
print('Accuracy of GaussianNB Classifier on training set: {:.2F}'
      .format(gnb.score(X_train,y_train)))
print('Accuracy of GaussianNB Tree Classifier on test set: {:.2F}'
      .format(gnb.score(X_test,y_test)))
#NaiveBayes




#Support Vector Machine Classifier
################################
from sklearn.svm import SVC
svm=SVC()
svm.fit(X_train,y_train)
print('Accuracy of SVM Classifier on training set: {:.2F}'
      .format(svm.score(X_train,y_train)))
print('Accuracy of SVM Tree Classifier on test set: {:.2F}'
      .format(svm.score(X_test,y_test)))
#Support Vector Machine Classifier


gamma='auto'


#Confusion matrix for knn classifer
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix

pred=knn.predict(X_test)
print(confusion_matrix(y_test,pred))
print(classification_report(y_test,pred))



#Save Models
import pickle
filename = 'logreg.sav'
pickle.dump(logreg, open(filename, 'wb'))

filename = 'dectree.sav'
pickle.dump(clf, open(filename, 'wb'))







