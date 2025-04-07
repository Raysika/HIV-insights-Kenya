from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import train_predict_new_infections  # ✅ Correct import
import numpy as np
import pandas as pd

app = FastAPI()

# Enable CORS so React can access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def convert_numpy(obj):
    """ Recursively convert NumPy types to native Python types """
    if isinstance(obj, dict):
        return {k: convert_numpy(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_numpy(i) for i in obj]
    elif isinstance(obj, (np.integer, np.int64)):
        return int(obj)
    elif isinstance(obj, (np.floating, np.float64)):
        return float(obj)
    elif isinstance(obj, (np.ndarray, pd.Series)):
        return obj.tolist()
    else:
        return obj

@app.get("/")
def read_root():
    return {"message": "API is working."}

@app.get("/predictions")
def get_predictions():
    try:
        model, predictions_df, metrics, region_map, level_map = train_predict_new_infections("hiv_dataset.csv")

        if predictions_df is None:
            return {"error": "Failed to generate predictions."}

        predictions_df = predictions_df.fillna(0)

        return {
            "predictions": convert_numpy(predictions_df.to_dict(orient="records")),
            "metrics": convert_numpy(metrics),
            "region_map": convert_numpy(region_map),
            "level_map": convert_numpy(level_map)
        }

    except Exception as e:
        print(f"Error: {e}")
        return {"error": f"Failed to generate predictions: {str(e)}"}
