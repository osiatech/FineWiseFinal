#models/predictor

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, Any
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
import logging
import joblib
import os

class ExpensePredictor:
    def __init__(self):
        self.models = {}  # Almacenar modelos por usuario
        self.scalers = {}  # Almacenar scalers por usuario
        self.model_dir = "data/model_storage"
        self._ensure_model_dir()
    
    def _ensure_model_dir(self):
        """Crea el directorio para almacenar modelos si no existe"""
        if not os.path.exists(self.model_dir):
            os.makedirs(self.model_dir)
    
    def predict_weekly_expenses(self, df: pd.DataFrame, user_id: str) -> Dict[str, Any]:
        """
        Predice los gastos de la próxima semana basado en patrones históricos
        """
        try:
            if df.empty:
                return self._default_prediction()
            
            # Filtrar solo gastos
            expense_df = df[df['type'] == 'expense'].copy()
            
            if len(expense_df) < 3:  # Necesitamos al menos 3 transacciones
                return self._fallback_prediction(expense_df)
            
            # Preparar datos para predicción
            predictions_by_category = {}
            total_predicted = 0
            confidence_scores = []
            
            # Predecir por categoría
            categories = expense_df['category'].unique()
            
            for category in categories:
                cat_data = expense_df[expense_df['category'] == category]
                
                if len(cat_data) >= 2:  # Al menos 2 transacciones por categoría
                    category_prediction = self._predict_category_expense(cat_data, user_id, category)
                    predictions_by_category[category] = category_prediction['amount']
                    total_predicted += category_prediction['amount']
                    confidence_scores.append(category_prediction['confidence'])
                else:
                    # Para categorías con pocas transacciones, usar promedio
                    avg_amount = cat_data['amount'].mean()
                    predictions_by_category[category] = float(avg_amount * 0.7)  # Factor conservador
                    total_predicted += predictions_by_category[category]
                    confidence_scores.append(0.3)  # Baja confianza
            
            # Calcular confianza general
            overall_confidence = np.mean(confidence_scores) if confidence_scores else 0.3
            
            # Aplicar factor estacional y tendencias
            adjusted_predictions = self._apply_seasonal_adjustment(
                predictions_by_category, expense_df
            )
            
            return {
                "by_category": adjusted_predictions,
                "total": sum(adjusted_predictions.values()),
                "confidence": float(overall_confidence),
                "model_type": "ml_prediction" if len(expense_df) > 10 else "statistical_estimation"
            }
            
        except Exception as e:
            logging.error(f"Error en predicción de gastos: {e}")
            return self._default_prediction()
    
    def _predict_category_expense(self, cat_data: pd.DataFrame, user_id: str, category: str) -> Dict[str, Any]:
        """Predice gastos para una categoría específica"""
        try:
            # Preparar features temporales
            cat_data = cat_data.sort_values('date')
            
            # Features: día de la semana, días desde la primera transacción
            if len(cat_data) >= 5:  # Suficientes datos para ML
                return self._ml_prediction(cat_data, user_id, category)
            else:
                return self._statistical_prediction(cat_data)
                
        except Exception as e:
            logging.error(f"Error prediciendo categoría {category}: {e}")
            avg_amount = cat_data['amount'].mean()
            return {"amount": float(avg_amount), "confidence": 0.2}
    
    def _ml_prediction(self, cat_data: pd.DataFrame, user_id: str, category: str) -> Dict[str, Any]:
        """Predicción usando Machine Learning"""
        try:
            # Preparar features
            cat_data = cat_data.copy()
            cat_data['days_since_start'] = (cat_data['date'] - cat_data['date'].min()).dt.days
            
            # Features para el modelo
            features = ['day_of_week', 'days_since_start']
            X = cat_data[features].values
            y = cat_data['amount'].values
            
            # Escalar features
            scaler_key = f"{user_id}_{category}"
            if scaler_key not in self.scalers:
                self.scalers[scaler_key] = StandardScaler()
                X_scaled = self.scalers[scaler_key].fit_transform(X)
            else:
                X_scaled = self.scalers[scaler_key].transform(X)
            
            # Entrenar modelo
            model = LinearRegression()
            model.fit(X_scaled, y)
            
            # Guardar modelo
            self.models[scaler_key] = model
            
            # Predecir para la próxima semana (promedio de 7 días)
            next_week_features = []
            base_date = cat_data['date'].max() + timedelta(days=1)
            
            for i in range(7):
                future_date = base_date + timedelta(days=i)
                days_since_start = (future_date - cat_data['date'].min()).days
                day_of_week = future_date.weekday()
                next_week_features.append([day_of_week, days_since_start])
            
            X_future = np.array(next_week_features)
            X_future_scaled = self.scalers[scaler_key].transform(X_future)
            
            # Realizar predicción
            predictions = model.predict(X_future_scaled)
            
            # Filtrar predicciones negativas y aplicar límites razonables
            predictions = np.maximum(predictions, 0)
            avg_historical = cat_data['amount'].mean()
            predictions = np.minimum(predictions, avg_historical * 3)  # Máximo 3x el promedio
            
            predicted_amount = np.mean(predictions)
            
            # Calcular confianza basada en R²
            score = model.score(X_scaled, y)
            confidence = max(0.3, min(0.9, score))  # Entre 0.3 y 0.9
            
            return {
                "amount": float(predicted_amount),
                "confidence": float(confidence)
            }
            
        except Exception as e:
            logging.error(f"Error en predicción ML: {e}")
            return self._statistical_prediction(cat_data)
    
    def _statistical_prediction(self, cat_data: pd.DataFrame) -> Dict[str, Any]:
        """Predicción estadística simple"""
        try:
            # Análisis de tendencia simple
            recent_data = cat_data.tail(min(5, len(cat_data)))
            
            if len(recent_data) >= 3:
                # Calcular tendencia
                amounts = recent_data['amount'].values
                time_indices = np.arange(len(amounts))
                
                # Regresión lineal simple
                slope = np.polyfit(time_indices, amounts, 1)[0]
                
                # Predicción basada en tendencia
                base_amount = recent_data['amount'].mean()
                trend_adjustment = slope * 2  # Proyectar tendencia
                
                predicted_amount = max(0, base_amount + trend_adjustment)
                
                # Confianza basada en variabilidad
                variability = recent_data['amount'].std() / recent_data['amount'].mean()
                confidence = max(0.2, 0.7 - variability)
                
            else:
                # Muy pocos datos, usar promedio simple
                predicted_amount = cat_data['amount'].mean()
                confidence = 0.3
            
            return {
                "amount": float(predicted_amount),
                "confidence": float(confidence)
            }
            
        except Exception as e:
            logging.error(f"Error en predicción estadística: {e}")
            avg_amount = cat_data['amount'].mean()
            return {"amount": float(avg_amount), "confidence": 0.2}
    
    def _apply_seasonal_adjustment(self, predictions: Dict[str, float], expense_df: pd.DataFrame) -> Dict[str, float]:
        """Aplica ajustes estacionales y de tendencia"""
        try:
            adjusted = predictions.copy()
            
            # Factor de día de la semana
            current_day = datetime.now().weekday()
            
            # Analizar patrones por día de la semana
            if not expense_df.empty:
                daily_avg = expense_df.groupby('day_of_week')['amount'].mean()
                overall_avg = expense_df['amount'].mean()
                
                if current_day in daily_avg.index and overall_avg > 0:
                    day_factor = daily_avg[current_day] / overall_avg
                    
                    # Aplicar factor suavizado
                    for category in adjusted:
                        adjusted[category] *= (1 + (day_factor - 1) * 0.3)  # Suavizar el efecto
            
            # Asegurar valores positivos
            for category in adjusted:
                adjusted[category] = max(0, adjusted[category])
            
            return adjusted
            
        except Exception as e:
            logging.error(f"Error aplicando ajustes estacionales: {e}")
            return predictions
    
    def _fallback_prediction(self, expense_df: pd.DataFrame) -> Dict[str, Any]:
        """Predicción de respaldo para pocos datos"""
        if expense_df.empty:
            return self._default_prediction()
        
        # Usar promedios simples por categoría
        category_avgs = expense_df.groupby('category')['amount'].mean().to_dict()
        
        # Aplicar factor conservador
        predictions = {cat: float(avg * 0.8) for cat, avg in category_avgs.items()}
        
        return {
            "by_category": predictions,
            "total": sum(predictions.values()),
            "confidence": 0.4,
            "model_type": "fallback_estimation"
        }
    
    def _default_prediction(self) -> Dict[str, Any]:
        """Predicción por defecto cuando no hay datos"""
        return {
            "by_category": {},
            "total": 0.0,
            "confidence": 0.0,
            "model_type": "no_data"
        }
    
    def save_model(self, user_id: str):
        """Guarda el modelo del usuario"""
        try:
            user_models = {k: v for k, v in self.models.items() if k.startswith(user_id)}
            user_scalers = {k: v for k, v in self.scalers.items() if k.startswith(user_id)}
            
            if user_models:
                model_path = os.path.join(self.model_dir, f"{user_id}_models.pkl")
                joblib.dump({"models": user_models, "scalers": user_scalers}, model_path)
                
        except Exception as e:
            logging.error(f"Error guardando modelo para {user_id}: {e}")
    
    def load_model(self, user_id: str):
        """Carga el modelo del usuario"""
        try:
            model_path = os.path.join(self.model_dir, f"{user_id}_models.pkl")
            if os.path.exists(model_path):
                data = joblib.load(model_path)
                self.models.update(data.get("models", {}))
                self.scalers.update(data.get("scalers", {}))
                
        except Exception as e:
            logging.error(f"Error cargando modelo para {user_id}: {e}")