import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OrdinalEncoder
from sklearn.metrics import mean_squared_error
from sklearn import svm
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np
import pickle


data = pd.read_csv('vul_data.csv')

ordinal_encoder = OrdinalEncoder(categories=[
    ['low', 'moderate', 'high'],          # mobility
    ['0', '1', '2', '3', '3+'],           # loved_ones
    ['live with', 'daily', 'weekly', 'monthly', 'never']  # frequency_of_visits
])

data[['mobility', 'loved_ones', 'frequency_of_visits']] = ordinal_encoder.fit_transform(
    data[['mobility', 'loved_ones', 'frequency_of_visits']])

X = data.drop('vul_score', axis=1)
y = data['vul_score']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
'''
param_grid = {
     "C": np.logspace(3, 6, num=7),
    "gamma": np.logspace(-5, 1, num=5),
    'epsilon': np.logspace(-5, 1, num=5)
}
svr = svm.SVR()
grid = GridSearchCV(
     svr,
     param_grid=param_grid,
     scoring="balanced_accuracy"
 )
grid.fit(X_train, y_train)
print(grid.best_params_) #{'C': np.float64(3162.2776601683795), 'epsilon': np.float64(0.00031622776601683794), 'gamma': np.float64(0.00031622776601683794)}
y_pred = grid.predict(X_test)
'''
svr = svm.SVR(
    kernel='rbf', 
    C=3162.27, 
    epsilon=0.00031622776601683794, 
    gamma=0.00031622776601683794,
)
svr.fit(X_train, y_train)
y_pred = svr.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error (MSE): {mse}")

with open('vul_scorer.pkl','wb') as model_file:
    pickle.dump(svr,model_file)