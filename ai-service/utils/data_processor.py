#utilsa/data_processor

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import List, Dict, Any
import logging

class DataProcessor:
    def __init__(self):
        self.category_mapping = {
            # Mapeo de categorías de transacciones a categorías de budget
            'food': 'FOOD',
            'transportation': 'TRANSPORTATION',
            'entertainment': 'ENTERTAINMENT',
            'housing': 'HOUSING',
            'utilities': 'UTILITIES',
            'healthcare': 'HEALTHCARE',
            'insurance': 'INSURANCE',
            'clothing': 'CLOTHING',
            'personal_care': 'PERSONAL_CARE',
            'education': 'EDUCATION',
            'savings': 'SAVINGS',
            'debt_repayment': 'DEBT_REPAYMENT'
        }
    
    def process_transactions(self, transactions: List[Any]) -> pd.DataFrame:
        """Procesa las transacciones y las convierte en DataFrame para análisis"""
        try:
            if not transactions:
                return pd.DataFrame()
            
            # Convertir transacciones a lista de diccionarios
            trans_data = []
            for trans in transactions:
                trans_dict = {
                    'amount': float(trans.amount) if trans.amount else 0.0,
                    'category': trans.category.lower() if trans.category else 'other',
                    'description': trans.description or '',
                    'type': trans.type.lower(),
                    'date': self._parse_date(trans.date) if trans.date else datetime.now()
                }
                trans_data.append(trans_dict)
            
            df = pd.DataFrame(trans_data)
            
            # Limpiar y procesar datos
            df = self._clean_transaction_data(df)
            
            return df
            
        except Exception as e:
            logging.error(f"Error procesando transacciones: {e}")
            return pd.DataFrame()
    
    def process_budgets(self, budgets: List[Any]) -> pd.DataFrame:
        """Procesa los presupuestos"""
        try:
            if not budgets:
                return pd.DataFrame()
            
            budget_data = []
            for budget in budgets:
                budget_dict = {
                    'category': budget.category.upper(),
                    'amount_planned': float(budget.amountPlanned),
                    'period_start': self._parse_date(budget.periodStart),
                    'period_end': self._parse_date(budget.periodEnd)
                }
                budget_data.append(budget_dict)
            
            return pd.DataFrame(budget_data)
            
        except Exception as e:
            logging.error(f"Error procesando budgets: {e}")
            return pd.DataFrame()
    
    def process_debts(self, debts: List[Any]) -> pd.DataFrame:
        """Procesa las deudas"""
        try:
            if not debts:
                return pd.DataFrame()
            
            debt_data = []
            for debt in debts:
                debt_dict = {
                    'type': debt.type,
                    'amount': float(debt.amount),
                    'due_date': self._parse_date(debt.dueDate) if debt.dueDate else None,
                    'interest_rate': float(debt.interestRate) if debt.interestRate else 0.0,
                    'description': debt.description or ''
                }
                debt_data.append(debt_dict)
            
            return pd.DataFrame(debt_data)
            
        except Exception as e:
            logging.error(f"Error procesando deudas: {e}")
            return pd.DataFrame()
    
    def _parse_date(self, date_str: str) -> datetime:
        """Parsea fechas en diferentes formatos"""
        try:
            # Intentar diferentes formatos de fecha
            formats = ['%Y-%m-%d', '%Y-%m-%dT%H:%M:%S', '%Y-%m-%dT%H:%M:%S.%f', '%d/%m/%Y']
            
            for fmt in formats:
                try:
                    return datetime.strptime(date_str, fmt)
                except ValueError:
                    continue
            
            # Si ningún formato funciona, usar fecha actual
            return datetime.now()
            
        except:
            return datetime.now()
    
    def _clean_transaction_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Limpia y valida los datos de transacciones"""
        try:
            if df.empty:
                return df
            
            # Remover transacciones con montos negativos o zero para expenses
            df = df[~((df['type'] == 'expense') & (df['amount'] <= 0))]
            
            # Convertir amounts negativos a positivos para expenses
            df.loc[df['type'] == 'expense', 'amount'] = df.loc[df['type'] == 'expense', 'amount'].abs()
            
            # Agregar columnas de tiempo
            df['day_of_week'] = df['date'].dt.dayofweek
            df['month'] = df['date'].dt.month
            df['week_of_year'] = df['date'].dt.isocalendar().week
            df['days_ago'] = (datetime.now() - df['date']).dt.days
            
            # Normalizar categorías
            df['category'] = df['category'].str.lower().str.strip()
            
            return df
            
        except Exception as e:
            logging.error(f"Error limpiando datos: {e}")
            return df
    
    def generate_financial_summary(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Genera un resumen financiero basado en las transacciones"""
        try:
            if df.empty:
                return {
                    "total_income": 0,
                    "total_expenses": 0,
                    "net_balance": 0,
                    "categories_breakdown": {},
                    "transaction_count": 0,
                    "average_expense": 0
                }
            
            # Calcular métricas básicas
            income_df = df[df['type'] == 'income']
            expense_df = df[df['type'] == 'expense']
            
            total_income = income_df['amount'].sum() if not income_df.empty else 0
            total_expenses = expense_df['amount'].sum() if not expense_df.empty else 0
            
            # Breakdown por categorías
            categories_breakdown = {}
            if not expense_df.empty:
                categories_breakdown = expense_df.groupby('category')['amount'].sum().to_dict()
            
            # Cálculos adicionales
            avg_expense = expense_df['amount'].mean() if not expense_df.empty else 0
            
            # Tendencia de gastos (últimos 30 días vs anteriores)
            thirty_days_ago = datetime.now() - timedelta(days=30)
            recent_expenses = expense_df[expense_df['date'] >= thirty_days_ago]['amount'].sum()
            older_expenses = expense_df[expense_df['date'] < thirty_days_ago]['amount'].sum()
            
            spending_trend = "stable"
            if older_expenses > 0:
                trend_ratio = recent_expenses / older_expenses
                if trend_ratio > 1.2:
                    spending_trend = "increasing"
                elif trend_ratio < 0.8:
                    spending_trend = "decreasing"
            
            return {
                "total_income": float(total_income),
                "total_expenses": float(total_expenses),
                "net_balance": float(total_income - total_expenses),
                "categories_breakdown": {k: float(v) for k, v in categories_breakdown.items()},
                "transaction_count": len(df),
                "average_expense": float(avg_expense),
                "recent_expenses_30d": float(recent_expenses),
                "spending_trend": spending_trend,
                "analysis_date": datetime.now().isoformat()
            }
            
        except Exception as e:
            logging.error(f"Error generando resumen: {e}")
            return {"error": "No se pudo generar el resumen financiero"}
    
    def get_weekly_patterns(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Analiza patrones de gasto por día de la semana"""
        try:
            if df.empty:
                return {}
            
            expense_df = df[df['type'] == 'expense']
            if expense_df.empty:
                return {}
            
            # Gastos por día de la semana
            weekly_pattern = expense_df.groupby('day_of_week')['amount'].mean().to_dict()
            
            # Mapear números a nombres de días
            day_names = {0: 'monday', 1: 'tuesday', 2: 'wednesday', 3: 'thursday', 
                        4: 'friday', 5: 'saturday', 6: 'sunday'}
            
            named_pattern = {day_names[k]: float(v) for k, v in weekly_pattern.items() if k in day_names}
            
            return named_pattern
            
        except Exception as e:
            logging.error(f"Error analizando patrones semanales: {e}")
            return {}