#models/anomaly_detector

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Any
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import logging

class AnomalyDetector:
    def __init__(self):
        self.models = {}
        self.scalers = {}
    
    def detect_anomalies(self, df: pd.DataFrame, user_id: str) -> Dict[str, Any]:
        """
        Detecta gastos anómalos y patrones inusuales en las transacciones
        """
        try:
            if df.empty:
                return self._no_anomalies_response()
            
            expense_df = df[df['type'] == 'expense'].copy()
            
            if len(expense_df) < 5:
                return self._statistical_anomaly_detection(expense_df)
            
            # Detección de anomalías usando múltiples métodos
            anomalies = []
            
            # 1. Anomalías por monto (usando IsolationForest)
            amount_anomalies = self._detect_amount_anomalies(expense_df, user_id)
            anomalies.extend(amount_anomalies)
            
            # 2. Anomalías por frecuencia de gastos
            frequency_anomalies = self._detect_frequency_anomalies(expense_df)
            anomalies.extend(frequency_anomalies)
            
            # 3. Anomalías por patrones de categorías
            category_anomalies = self._detect_category_anomalies(expense_df)
            anomalies.extend(category_anomalies)
            
            # 4. Anomalías por días de la semana
            temporal_anomalies = self._detect_temporal_anomalies(expense_df)
            anomalies.extend(temporal_anomalies)
            
            # Calcular score de riesgo general
            risk_score = self._calculate_risk_score(anomalies, expense_df)
            
            # Remover duplicados y ordenar por severidad
            unique_anomalies = self._deduplicate_anomalies(anomalies)
            
            return {
                "anomalies": unique_anomalies,
                "risk_score": risk_score,
                "total_anomalies": len(unique_anomalies),
                "analysis_date": datetime.now().isoformat()
            }
            
        except Exception as e:
            logging.error(f"Error detectando anomalías: {e}")
            return self._no_anomalies_response()
    
    def _detect_amount_anomalies(self, expense_df: pd.DataFrame, user_id: str) -> List[Dict[str, Any]]:
        """Detecta anomalías basadas en montos usando Isolation Forest"""
        try:
            anomalies = []
            
            if len(expense_df) < 10:  # Para pocos datos, usar método estadístico
                return self._statistical_amount_anomalies(expense_df)
            
            # Preparar datos para Isolation Forest
            features = expense_df[['amount', 'day_of_week']].values
            
            # Escalar features
            scaler = StandardScaler()
            features_scaled = scaler.fit_transform(features)
            
            # Entrenar Isolation Forest
            model = IsolationForest(contamination=0.1, random_state=42)
            predictions = model.fit_predict(features_scaled)
            
            # Identificar anomalías
            anomaly_indices = np.where(predictions == -1)[0]
            
            for idx in anomaly_indices:
                transaction = expense_df.iloc[idx]
                
                # Calcular qué tan anómalo es
                avg_amount = expense_df['amount'].mean()
                std_amount = expense_df['amount'].std()
                z_score = abs((transaction['amount'] - avg_amount) / std_amount) if std_amount > 0 else 0
                
                severity = "high" if z_score > 2.5 else "medium" if z_score > 1.5 else "low"
                
                anomalies.append({
                    "type": "unusual_amount",
                    "severity": severity,
                    "description": f"Gasto inusual de ${transaction['amount']:.2f} en {transaction['category']}",
                    "amount": float(transaction['amount']),
                    "category": transaction['category'],
                    "date": transaction['date'].isoformat(),
                    "z_score": float(z_score),
                    "context": f"Promedio histórico: ${avg_amount:.2f}"
                })
            
            return anomalies
            
        except Exception as e:
            logging.error(f"Error en detección de anomalías por monto: {e}")
            return []
    
    def _statistical_amount_anomalies(self, expense_df: pd.DataFrame) -> List[Dict[str, Any]]:
        """Detección estadística simple para pocos datos"""
        try:
            anomalies = []
            
            # Usar método de Z-score
            mean_amount = expense_df['amount'].mean()
            std_amount = expense_df['amount'].std()
            
            if std_amount == 0:
                return []
            
            # Detectar outliers (Z-score > 2)
            z_scores = np.abs((expense_df['amount'] - mean_amount) / std_amount)
            outlier_indices = np.where(z_scores > 2)[0]
            
            for idx in outlier_indices:
                transaction = expense_df.iloc[idx]
                z_score = z_scores[idx]
                
                severity = "high" if z_score > 3 else "medium"
                
                anomalies.append({
                    "type": "statistical_outlier",
                    "severity": severity,
                    "description": f"Gasto estadísticamente inusual de ${transaction['amount']:.2f}",
                    "amount": float(transaction['amount']),
                    "category": transaction['category'],
                    "date": transaction['date'].isoformat(),
                    "z_score": float(z_score),
                    "context": f"Desviación de {z_score:.1f} veces la norma"
                })
            
            return anomalies
            
        except Exception as e:
            logging.error(f"Error en detección estadística: {e}")
            return []
    
    def _detect_frequency_anomalies(self, expense_df: pd.DataFrame) -> List[Dict[str, Any]]:
        """Detecta anomalías en la frecuencia de gastos"""
        try:
            anomalies = []
            
            # Analizar gastos por día
            daily_spending = expense_df.groupby(expense_df['date'].dt.date).agg({
                'amount': 'sum',
                'category': 'count'
            }).rename(columns={'category': 'transaction_count'})
            
            if len(daily_spending) < 3:
                return []
            
            # Detectar días con gastos excesivos
            mean_daily = daily_spending['amount'].mean()
            std_daily = daily_spending['amount'].std()
            
            if std_daily > 0:
                high_spending_days = daily_spending[
                    daily_spending['amount'] > mean_daily + 2 * std_daily
                ]
                
                for date, row in high_spending_days.iterrows():
                    day_transactions = expense_df[expense_df['date'].dt.date == date]
                    
                    anomalies.append({
                        "type": "high_frequency_spending",
                        "severity": "medium",
                        "description": f"Día de gastos elevados: ${row['amount']:.2f}",
                        "date": date.isoformat(),
                        "amount": float(row['amount']),
                        "transaction_count": int(row['transaction_count']),
                        "context": f"Promedio diario: ${mean_daily:.2f}",
                        "categories": day_transactions['category'].unique().tolist()
                    })
            
            # Detectar patrones de gasto muy frecuentes
            recent_week = expense_df[expense_df['days_ago'] <= 7]
            if len(recent_week) > 10:  # Más de 10 transacciones en una semana
                anomalies.append({
                    "type": "high_transaction_frequency",
                    "severity": "low",
                    "description": f"Frecuencia alta de transacciones: {len(recent_week)} en 7 días",
                    "transaction_count": len(recent_week),
                    "context": "Considera revisar si todos los gastos son necesarios"
                })
            
            return anomalies
            
        except Exception as e:
            logging.error(f"Error detectando anomalías de frecuencia: {e}")
            return []
    
    def _detect_category_anomalies(self, expense_df: pd.DataFrame) -> List[Dict[str, Any]]:
        """Detecta anomalías en los patrones de categorías"""
        try:
            anomalies = []
            
            # Analizar distribución de gastos por categoría
            category_spending = expense_df.groupby('category')['amount'].agg(['sum', 'count', 'mean'])
            
            if len(category_spending) < 2:
                return []
            
            # Detectar categorías con gastos desproporcionados
            total_spending = category_spending['sum'].sum()
            
            for category, row in category_spending.iterrows():
                percentage = (row['sum'] / total_spending) * 100
                
                # Alerta si una categoría representa más del 60% del gasto total
                if percentage > 60:
                    anomalies.append({
                        "type": "category_concentration",
                        "severity": "high",
                        "description": f"Concentración alta en {category}: {percentage:.1f}% del gasto total",
                        "category": category,
                        "percentage": float(percentage),
                        "amount": float(row['sum']),
                        "context": "Considera diversificar tus gastos"
                    })
                
                # Detectar categorías con gastos promedio muy altos
                overall_mean = expense_df['amount'].mean()
                if row['mean'] > overall_mean * 3:
                    anomalies.append({
                        "type": "high_average_category",
                        "severity": "medium",
                        "description": f"Promedio alto en {category}: ${row['mean']:.2f}",
                        "category": category,
                        "average_amount": float(row['mean']),
                        "overall_average": float(overall_mean),
                        "context": "Esta categoría tiene gastos promedio elevados"
                    })
            
            return anomalies
            
        except Exception as e:
            logging.error(f"Error detectando anomalías de categoría: {e}")
            return []
    
    def _detect_temporal_anomalies(self, expense_df: pd.DataFrame) -> List[Dict[str, Any]]:
        """Detecta anomalías en patrones temporales"""
        try:
            anomalies = []
            
            # Analizar gastos por día de la semana
            weekly_pattern = expense_df.groupby('day_of_week')['amount'].sum()
            
            if len(weekly_pattern) >= 3:
                mean_daily = weekly_pattern.mean()
                std_daily = weekly_pattern.std()
                
                if std_daily > 0:
                    # Detectar días con gastos muy por encima del promedio
                    high_days = weekly_pattern[weekly_pattern > mean_daily + 1.5 * std_daily]
                    
                    day_names = {0: 'Lunes', 1: 'Martes', 2: 'Miércoles', 3: 'Jueves', 
                                4: 'Viernes', 5: 'Sábado', 6: 'Domingo'}
                    
                    for day_num, amount in high_days.items():
                        anomalies.append({
                            "type": "temporal_pattern",
                            "severity": "low",
                            "description": f"Gastos elevados los {day_names.get(day_num, 'días')}",
                            "day_of_week": day_names.get(day_num, 'Desconocido'),
                            "amount": float(amount),
                            "context": f"Promedio semanal: ${mean_daily:.2f}"
                        })
            
            # Detectar gastos nocturnos inusuales (si hay información de hora)
            if 'date' in expense_df.columns:
                night_transactions = expense_df[
                    (expense_df['date'].dt.hour >= 22) | (expense_df['date'].dt.hour <= 5)
                ]
                
                if len(night_transactions) > len(expense_df) * 0.3:  # Más del 30% en horario nocturno
                    anomalies.append({
                        "type": "unusual_timing",
                        "severity": "low",
                        "description": f"Alto porcentaje de gastos nocturnos: {len(night_transactions)} transacciones",
                        "count": len(night_transactions),
                        "context": "Revisa si estos gastos son planificados"
                    })
            
            return anomalies
            
        except Exception as e:
            logging.error(f"Error detectando anomalías temporales: {e}")
            return []
    
    def _calculate_risk_score(self, anomalies: List[Dict[str, Any]], expense_df: pd.DataFrame) -> float:
        """Calcula un score de riesgo general basado en las anomalías detectadas"""
        try:
            if not anomalies:
                return 0.0
            
            # Peso por severidad
            severity_weights = {"high": 1.0, "medium": 0.6, "low": 0.3}
            
            total_weight = 0
            for anomaly in anomalies:
                severity = anomaly.get("severity", "low")
                total_weight += severity_weights.get(severity, 0.3)
            
            # Normalizar score (máximo 10)
            base_score = min(10, total_weight)
            
            # Ajustar por volumen de datos
            if len(expense_df) < 10:
                base_score *= 0.7  # Reducir confianza con pocos datos
            
            # Ajustar por cantidad de anomalías vs total de transacciones
            anomaly_ratio = len(anomalies) / len(expense_df)
            if anomaly_ratio > 0.5:  # Más del 50% son anomalías
                base_score *= 0.8  # Posiblemente falsos positivos
            
            return round(float(base_score), 2)
            
        except Exception as e:
            logging.error(f"Error calculando risk score: {e}")
            return 0.0
    
    def _deduplicate_anomalies(self, anomalies: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Remueve anomalías duplicadas y las ordena por severidad"""
        try:
            # Crear clave única para cada anomalía
            seen = set()
            unique_anomalies = []
            
            # Ordenar por severidad
            severity_order = {"high": 0, "medium": 1, "low": 2}
            anomalies.sort(key=lambda x: severity_order.get(x.get("severity", "low"), 2))
            
            for anomaly in anomalies:
                # Crear clave única basada en tipo y contexto principal
                key = f"{anomaly.get('type', '')}_{anomaly.get('category', '')}_{anomaly.get('date', '')}"
                
                if key not in seen:
                    seen.add(key)
                    unique_anomalies.append(anomaly)
            
            return unique_anomalies[:10]  # Máximo 10 anomalías
            
        except Exception as e:
            logging.error(f"Error deduplicando anomalías: {e}")
            return anomalies
    
    def _statistical_anomaly_detection(self, expense_df: pd.DataFrame) -> Dict[str, Any]:
        """Detección simple para pocos datos"""
        try:
            if expense_df.empty:
                return self._no_anomalies_response()
            
            anomalies = []
            
            # Buscar gastos que sean 3 veces el promedio
            mean_amount = expense_df['amount'].mean()
            
            high_expenses = expense_df[expense_df['amount'] > mean_amount * 3]
            
            for _, transaction in high_expenses.iterrows():
                anomalies.append({
                    "type": "high_expense",
                    "severity": "medium",
                    "description": f"Gasto elevado: ${transaction['amount']:.2f} en {transaction['category']}",
                    "amount": float(transaction['amount']),
                    "category": transaction['category'],
                    "context": f"Es {transaction['amount']/mean_amount:.1f}x el promedio"
                })
            
            return {
                "anomalies": anomalies,
                "risk_score": len(anomalies) * 2.0,  # Score simple
                "total_anomalies": len(anomalies),
                "analysis_date": datetime.now().isoformat()
            }
            
        except Exception as e:
            logging.error(f"Error en detección estadística simple: {e}")
            return self._no_anomalies_response()
    
    def _no_anomalies_response(self) -> Dict[str, Any]:
        """Respuesta cuando no hay anomalías detectadas"""
        return {
            "anomalies": [],
            "risk_score": 0.0,
            "total_anomalies": 0,
            "analysis_date": datetime.now().isoformat()
        }