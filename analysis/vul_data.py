import pandas as pd
import numpy as np

# Create a dataset function
def generate_dataset(num_samples=1000):
    # Define the categories for each column
    age_percentile = np.random.randint(50, 101, num_samples)
    mobility = np.random.choice(['low', 'moderate', 'high'], num_samples, p=[0.3, 0.5, 0.2])
    loved_ones = np.random.choice(['0', '1', '2', '3', '3+'], num_samples, p=[0.2, 0.25, 0.25, 0.15, 0.15])
    frequency_of_visits = np.random.choice(['live with', 'daily', 'weekly', 'monthly', 'never'], num_samples, p=[0.15, 0.2, 0.25, 0.2, 0.2])
    
    data = pd.DataFrame({
        'age_percentile': age_percentile,
        'mobility': mobility,
        'loved_ones': loved_ones,
        'frequency_of_visits': frequency_of_visits,

    })

    mobility_score = {'low': 0, 'moderate': 1, 'high': 2}
    loved_ones_score = {'0': 0, '1': 1, '2': 2, '3': 3, '3+': 4}
    frequency_score = {'live with': 0, 'daily': 1, 'weekly': 2, 'monthly': 3, 'never': 4}

    vul_score = data['age_percentile'] / 20 + \
                                  data['mobility'].map(mobility_score) + \
                                  data['loved_ones'].map(loved_ones_score) + \
                                  data['frequency_of_visits'].map(frequency_score)
    
    norm_vul_score = (vul_score/max(vul_score))*10
    data['vul_score'] = norm_vul_score
    
    data.to_csv('vul_data.csv',index=False)

    # Map values to vulnerability scores
    mobility_score = {'low': 0, 'moderate': 1, 'high': 2}
    loved_ones_score = {'0': 0, '1': 1, '2': 2, '3': 3, '3+': 4}
    frequency_score = {'live with': 0, 'daily': 1, 'weekly': 2, 'monthly': 3, 'never': 4}

generate_dataset(100)
    