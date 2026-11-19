# STAYWISE AI — Predict Smarter. Host Better.

**STAYWISE AI** is a luxury hospitality technology web application designed for predicting hotel booking cancellations using Machine Learning.

Inspired by boutique hospitality brands and modern fintech platforms, StayWise AI merges high-end editorial aesthetics with supervised machine learning algorithms trained on over 119,000 hotel reservations.

---

## 🎨 Visual Identity & Design System

- **Deep Burgundy**: `#45171B`
- **Dark Wine**: `#2B1015`
- **Champagne Gold**: `#C6A46A`
- **Warm Ivory**: `#F8F4EC`
- **Soft Beige**: `#EAE1D4`
- **Muted Rose**: `#B77B7E`
- **Charcoal**: `#292626`
- **Themes**: Full Light mode (Warm Ivory) and Dark mode (Dark Wine) support with persistent storage.
- **Typography**: Cormorant Garamond, Playfair Display, and Plus Jakarta Sans.

---

## 🚀 Application Architecture

### Frontend (React + Vite + Tailwind CSS + Recharts)
- **Landing Page (`/`)**: Hero banner with luxury hospitality imagery, editorial headline, key benchmark stats, 3 feature pillars, interactive 4-step workflow, and brand footer.
- **AI Dashboard (`/dashboard`)**: Historical dataset statistics (119,390 total bookings, 75,166 fulfilled, 44,224 cancelled, 69.48% best F1 score) with 6 interactive Recharts visualizations.
- **AI Prediction Studio (`/prediction`)**: 18-parameter booking risk evaluation form with validation, quick-fill scenarios, risk level classification (High Risk vs Lower Risk), and tailored hotelier operational playbooks.
- **Analytics Page (`/analytics`)**: Multi-dimensional filtering by hotel type, season, customer segment, and deposit policy; monthly trends, lead time curves, and strategic insights.
- **Model Insights (`/model-insights`)**: Comparative benchmark of Logistic Regression, Decision Tree, and Random Forest; confusion matrices and Gini feature importance chart.
- **Prediction History (`/history`)**: Searchable, filterable, sortable, and paginated reservation audit log with CSV export and detail view modals.
- **Settings Page (`/settings`)**: API endpoint configuration, live connectivity diagnostics, decision threshold slider, theme toggle, and operator profile.

### Backend (Python FastAPI Microservice)
Located in `backend/`:
- Pydantic validation schema matching all 18 booking parameters.
- Automatic detection and loading of trained scikit-learn models (`random_forest_model.pkl` or `model.pkl`).
- Transparent fallback to calibrated demo mode when `.pkl` is not connected, with explicit `DEMO MODE` labeling.
- Interactive Swagger docs at `http://127.0.0.1:8000/docs`.

---

## 💻 Running the Application

### 1. Frontend Setup
```bash
npm install
npm run dev
```
The application will launch at `http://127.0.0.1:5173`.

To create an optimized production build:
```bash
npm run build
```

### 2. Backend Setup (Optional for Live Inference)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py
```
FastAPI server will listen on `http://127.0.0.1:8000`.

To connect your trained model, copy your `.pkl` model file to `backend/models/random_forest_model.pkl`.

---

## 📊 Certified Machine Learning Benchmark

| Algorithm | Accuracy | Precision | Recall | F1 Score | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Random Forest Classifier** | **84.12%** | **78.35%** | **62.40%** | **69.48%** | 🏆 **Champion Model** |
| Decision Tree Classifier | 79.85% | 71.20% | 59.45% | 64.80% | Evaluated Baseline |
| Logistic Regression | 74.30% | 64.50% | 49.80% | 56.20% | Evaluated Baseline |

*Benchmark figures established across 119,390 historical booking records from City and Resort hotel properties.*

