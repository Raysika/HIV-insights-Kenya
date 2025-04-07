# The libraries imported for this training
# To split the model, for linear regression, labelling as well as median
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error

def train_predict_new_infections(file_path="hiv_dataset.csv"):
    try:
        # Loading the CSV file (it was previously cleaned)
        df = pd.read_csv(file_path)

        # Encode 'Region' which are the 47 counties and Kenya as the whole region
        region_label_encoder = LabelEncoder()
        df['Region_Encoded'] = region_label_encoder.fit_transform(df['Region'])
        region_mapping = dict(zip(region_label_encoder.classes_, region_label_encoder.transform(region_label_encoder.classes_)))

        # Encode 'Level' (which we use to distinguish Kenya as a COUNTRY from the 47 COUNTIES)
        level_label_encoder = LabelEncoder()
        df['Level_Encoded'] = level_label_encoder.fit_transform(df['Level'])
        level_mapping = dict(zip(level_label_encoder.classes_, level_label_encoder.transform(level_label_encoder.classes_)))

        # Defining our model's features and target
        independent_features = ['Level_Encoded', 'Region_Encoded', 'PLHIV(All sexes)', 'HIV Prevelance(All sexes)', 'Incidence (per 1000)', 'Deaths(All)', 'PMTCT Need', 'PMTCT Receiving']
        dependent_feature = 'New Infections'

        X = df[independent_features]
        y = df[dependent_feature]

        # Split the data into 80% train  and 20% test
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Train the Linear Regression model
        model = LinearRegression()
        model.fit(X_train, y_train)

        # Predict on the entire dataset
        predictions = model.predict(X)
        predictions_df = df.copy()
        predictions_df['Predicted New Infections'] = predictions.round().astype(int)
        predictions_df_sorted = predictions_df.sort_values(by='Predicted New Infections', ascending=False)
        results_df = df.copy()
        results_df['Predicted New Infections'] = predictions.round().astype(int)

        # Calculating the infection rate for each region and to get highly infectious and less infectious counties
        # Error handling where initial infections might be 0 to avoid division by 0
        results_df['Infection Rate (%)'] = results_df.apply(
            lambda row: ((row['Predicted New Infections'] - row['PLHIV(All sexes)']) / row['Predicted New Infections']) * 100
            if row['Predicted New Infections'] != 0 else 0,
            axis=1
        )

        results_df_sorted = results_df.sort_values(by='Infection Rate (%)', ascending=False)
        # Evaluate the model on the test set
        y_pred = model.predict(X_test)
        r2 = r2_score(y_test, y_pred)
        mse = mean_squared_error(y_test, y_pred)
        mae = mean_absolute_error(y_test, y_pred)
        evaluation_metrics = {
            "r2_score": r2,
            "mean_squared_error": mse,
            "mean_absolute_error": mae
        }

        return [model, predictions_df_sorted, evaluation_metrics, region_mapping, level_mapping]

    except FileNotFoundError:
        print(f"Error: CSV file not found at {file_path}")
        return None, None, None, None, None
    except KeyError as e:
        print(f"Error: Column not found in CSV file: {e}")
        return None, None, None, None, None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None, None, None, None, None