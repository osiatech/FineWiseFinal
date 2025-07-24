#ai-service/main

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
from models.predictor import ExpensePredictor
from models.anomaly_detector import AnomalyDetector
from models.recommender import FinancialRecommender
from utils.data_processor import DataProcessor

app = FastAPI(title="FinWise AI Service", version="1.0.0")

# Configurar CORS para permitir conexiones desde NestJS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Puertos de tu app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de datos usando Pydantic
class Transaction(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None
    type: str  # "income", "expense", "saving", etc.
    date: Optional[str] = None  # Si no se proporciona, usa fecha actual

class Budget(BaseModel):
    category: str
    amountPlanned: float
    periodStart: str
    periodEnd: str

class Debt(BaseModel):
    type: str
    amount: float
    dueDate: Optional[str] = None
    interestRate: Optional[float] = None
    description: Optional[str] = None

class UserFinancialData(BaseModel):
    user_id: str
    transactions: List[Transaction]
    budgets: Optional[List[Budget]] = []
    debts: Optional[List[Debt]] = []

class PredictionResponse(BaseModel):
    user_id: str
    period: str
    predicted_expenses: Dict[str, float]
    total_predicted: float
    confidence_score: float

class AnomalyResponse(BaseModel):
    user_id: str
    anomalies: List[Dict[str, Any]]
    risk_score: float

class RecommendationResponse(BaseModel):
    user_id: str
    recommendations: List[Dict[str, Any]]
    priority_score: float

# Inicializar modelos de IA
predictor = ExpensePredictor()
anomaly_detector = AnomalyDetector()
recommender = FinancialRecommender()
data_processor = DataProcessor()

@app.get("/")
async def root():
    return {"message": "FinWise AI Service is running!", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/predict/weekly-expenses", response_model=PredictionResponse)
async def predict_weekly_expenses(financial_data: UserFinancialData):
    """
    Predice los gastos de la próxima semana basado en el historial del usuario
    """
    try:
        # Procesar datos de entrada
        processed_data = data_processor.process_transactions(financial_data.transactions)
        
        if len(processed_data) == 0:
            raise HTTPException(status_code=400, detail="No hay suficientes datos para realizar predicciones")
        
        # Generar predicciones
        predictions = predictor.predict_weekly_expenses(processed_data, financial_data.user_id)
        
        return PredictionResponse(
            user_id=financial_data.user_id,
            period="next_week",
            predicted_expenses=predictions["by_category"],
            total_predicted=predictions["total"],
            confidence_score=predictions["confidence"]
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en predicción: {str(e)}")

@app.post("/detect/anomalies", response_model=AnomalyResponse)
async def detect_anomalies(financial_data: UserFinancialData):
    """
    Detecta gastos anómalos o patrones inusuales en las transacciones
    """
    try:
        processed_data = data_processor.process_transactions(financial_data.transactions)
        
        if len(processed_data) < 5:  # Necesitamos al menos 5 transacciones
            return AnomalyResponse(
                user_id=financial_data.user_id,
                anomalies=[],
                risk_score=0.0
            )
        
        anomalies = anomaly_detector.detect_anomalies(processed_data, financial_data.user_id)
        
        return AnomalyResponse(
            user_id=financial_data.user_id,
            anomalies=anomalies["anomalies"],
            risk_score=anomalies["risk_score"]
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en detección de anomalías: {str(e)}")

@app.post("/recommendations", response_model=RecommendationResponse)
async def get_recommendations(financial_data: UserFinancialData):
    """
    Genera recomendaciones personalizadas de ahorro y gestión financiera
    """
    try:
        processed_transactions = data_processor.process_transactions(financial_data.transactions)
        processed_budgets = data_processor.process_budgets(financial_data.budgets) if financial_data.budgets else []
        processed_debts = data_processor.process_debts(financial_data.debts) if financial_data.debts else []
        
        recommendations = recommender.generate_recommendations(
            processed_transactions, 
            processed_budgets, 
            processed_debts, 
            financial_data.user_id
        )
        
        return RecommendationResponse(
            user_id=financial_data.user_id,
            recommendations=recommendations["recommendations"],
            priority_score=recommendations["priority_score"]
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generando recomendaciones: {str(e)}")

@app.post("/financial-analysis")
async def comprehensive_analysis(financial_data: UserFinancialData):
    """
    Análisis financiero completo que combina predicciones, anomalías y recomendaciones
    """
    try:
        results = {}
        
        # Predicciones si hay suficientes datos
        try:
            prediction_response = await predict_weekly_expenses(financial_data)
            results["predictions"] = prediction_response
        except:
            results["predictions"] = None
        
        # Detección de anomalías
        try:
            anomaly_response = await detect_anomalies(financial_data)
            results["anomalies"] = anomaly_response
        except:
            results["anomalies"] = None
        
        # Recomendaciones
        try:
            recommendation_response = await get_recommendations(financial_data)
            results["recommendations"] = recommendation_response
        except:
            results["recommendations"] = None
        
        # Análisis general
        processed_data = data_processor.process_transactions(financial_data.transactions)
        summary = data_processor.generate_financial_summary(processed_data)
        results["summary"] = summary
        
        return {
            "user_id": financial_data.user_id,
            "analysis_date": datetime.now().isoformat(),
            "results": results
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en análisis completo: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)