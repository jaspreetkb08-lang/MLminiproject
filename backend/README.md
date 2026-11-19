# STAYWISE AI — Machine Learning Backend Service

FastAPI Python microservice for real-time hotel booking cancellation inference.

## Features
- Validates all 18 booking features via Pydantic schema
- Checks for trained Random Forest pickle models in `models/` directory (`random_forest_model.pkl` or `model.pkl`)
- Computes prediction class (0: Lower Risk, 1: High Risk)
- Computes prediction confidence and probability
- Generates tailored risk factors and operational hotelier suggestions
- Transparent demo fallback mode when `.pkl` is not connected

## Running the Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py
```

API will be available at: `http://127.0.0.1:8000`
Interactive Swagger Docs: `http://127.0.0.1:8000/docs`
Health check: `http://127.0.0.1:8000/api/health`

