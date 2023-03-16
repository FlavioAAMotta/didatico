# Exploring the Titanic dataset

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load the data
titanic = pd.read_csv('titanic.csv', index_col='PassengerId', sep=',')

# Print the first few rows of the DataFrame
print(titanic.head())

# Print the summary statistics
print(titanic.describe())

# Print the survival rate of passengers
print(titanic['survived'].mean())

# Print the survival rate of each class
print(titanic.groupby('pclass').survived.mean())

# Slice the DataFrame to select 'age' and 'fare'
age_fare = titanic.loc[:, ['Age', 'Pclass']]

#scatter plot age_fare
age_fare.plot(kind='scatter', x='Age', y='Pclass', alpha=0.1)

print(age_fare.shape)

# Slice the dataframe into train and test
train = age_fare.iloc[:700]
test = age_fare.iloc[700:]

# Print the shape of the train and test dataframes
print(train.shape)
print(test.shape)

# Train a decision tree to predict 'survived' based on 'age' and 'fare'
from sklearn.tree import DecisionTreeClassifier
tree = DecisionTreeClassifier(max_depth=3, random_state=1)
tree.fit(train[['Age', 'Pclass']], train['Survived'])

# Compute the feature importances of the fitted tree model
importances = tree.feature_importances_
print(importances)

# Plot the feature importances of the forest
plt.figure()
plt.title("Feature importances")
plt.bar(range(train[['Age', 'Pclass']].shape[1]), importances[0:2],
         color="r", align="center")
plt.xticks(range(train[['Age', 'Pclass']].shape[1]), ['Age', 'Pclass'])
plt.xlim([-1, train[['Age', 'Pclass']].shape[1]])
plt.show()

# Predict the labels of the test set: y_pred
y_pred = tree.predict(test[['Age', 'Pclass']])
print(y_pred)

# Compute the accuracy of the predictions: accuracy
accuracy = np.mean(y_pred == test['Survived'])
print(accuracy)
