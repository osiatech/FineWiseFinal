import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Any
import logging

class FinancialRecommender:
    def __init__(self):
        self.recommendation_rules = {
            "savings": {
                "threshold": 0.1,  # 10% de ingresos mínimo
                "target": 0.2,     # 20% objetivo
                "priority": "high"
            },
            "emergency_fund": {
                "months": 3,       # 3 meses de gastos
                "priority": "high"
            },
            "debt_ratio": {
                "threshold": 0.4,  # 40% máximo
                "priority": "high"
            },
            "category_limits": {
                "entertainment": 0.15,    # 15% máximo
                "food": 0.25,            # 25% máximo
                "transportation": 0.20,   # 20% máximo
                "housing": 0.30          # 30% máximo
            }
        }
    
    def generate_recommendations(self, transactions_df: pd.DataFrame, 
                               budgets_df: pd.DataFrame, 
                               debts_df: pd.DataFrame, 
                               user_id: str) -> Dict[str, Any]:
        """
        Genera recomendaciones personalizadas basadas en el análisis financiero
        """
        try:
            recommendations = []
            priority_score = 0
            
            # Análisis básico de finanzas
            financial_analysis = self._analyze_financial_health(
                transactions_df, budgets_df, debts_df
            )
            
            # 1. Recomendaciones de ahorro
            savings_recs = self._generate_savings_recommendations(financial_analysis)
            recommendations.extend(savings_recs)
            
            # 2. Recomendaciones de reducción de gastos
            expense_recs = self._generate_expense_reduction_recommendations(financial_analysis)
            recommendations.extend(expense_recs)
            
            # 3. Recomendaciones de gestión de deudas
            debt_recs = self._generate_debt_management_recommendations(financial_analysis)
            recommendations.extend(debt_recs)
            
            # 4. Recomendaciones de presupuesto
            budget_recs = self._generate_budget_recommendations(financial_analysis)
            recommendations.extend(budget_recs)
            
            # 5. Recomendaciones de inversión (básicas)
            investment_recs = self._generate_investment_recommendations(financial_analysis)
            recommendations.extend(investment_recs)
            
            # Calcular score de prioridad general
            priority_score = self._calculate_priority_score(recommendations, financial_analysis)
            
            # Ordenar y limitar recomendaciones
            final_recommendations = self._prioritize_recommendations(recommendations)
            
            return {
                "recommendations": final_recommendations,
                "priority_score": priority_score,
                "financial_health_score": financial_analysis.get("health_score", 5.0),
                "total_recommendations": len(final_recommendations),
                "analysis_date": datetime.now().isoformat()
            }
            
        except Exception as e:
            logging.error(f"Error generando recomendaciones: {e}")
            return self._default_recommendations()
    
    def _analyze_financial_health(self, transactions_df: pd.DataFrame, 
                                 budgets_df: pd.DataFrame, 
                                 debts_df: pd.DataFrame) -> Dict[str, Any]:
        """Análisis completo de la salud financiera"""
        try:
            analysis = {}
            
            if transactions_df.empty:
                return {"health_score": 5.0, "total_income": 0, "total_expenses": 0}
            
            # Análisis de ingresos y gastos
            income_df = transactions_df[transactions_df['type'] == 'income']
            expense_df = transactions_df[transactions_df['type'] == 'expense']
            savings_df = transactions_df[transactions_df['type'] == 'saving']
            
            total_income = income_df['amount'].sum() if not income_df.empty else 0
            total_expenses = expense_df['amount'].sum() if not expense_df.empty else 0
            total_savings = savings_df['amount'].sum() if not savings_df.empty else 0
            total_debts = debts_df['amount'].sum() if not debts_df.empty else 0
            
            # Ratios financieros básicos
            net_income = total_income - total_expenses
            savings_rate = (total_savings / total_income) if total_income > 0 else 0
            debt_to_income = (total_debts / total_income) if total_income > 0 else 0
            
            # Análisis por categorías
            category_breakdown = {}
            if not expense_df.empty:
                category_breakdown = expense_df.groupby('category')['amount'].sum().to_dict()
                category_percentages = {
                    cat: (amount / total_expenses) * 100 
                    for cat, amount in category_breakdown.items()
                } if total_expenses > 0 else {}
            else:
                category_percentages = {}
            
            # Score de salud financiera (1-10)
            health_score = self._calculate_health_score(
                savings_rate, debt_to_income, net_income, total_income
            )
            
            # Análisis de tendencias (últimos 30 días vs anteriores)
            thirty_days_ago = datetime.now() - timedelta(days=30)
            recent_expenses = expense_df[expense_df['date'] >= thirty_days_ago]['amount'].sum()
            older_expenses = expense_df[expense_df['date'] < thirty_days_ago]['amount'].sum()
            
            expense_trend = "stable"
            if older_expenses > 0:
                trend_ratio = recent_expenses / older_expenses
                if trend_ratio > 1.2:
                    expense_trend = "increasing"
                elif trend_ratio < 0.8:
                    expense_trend = "decreasing"
            
            analysis = {
                "total_income": float(total_income),
                "total_expenses": float(total_expenses),
                "total_savings": float(total_savings),
                "total_debts": float(total_debts),
                "net_income": float(net_income),
                "savings_rate": float(savings_rate),
                "debt_to_income": float(debt_to_income),
                "health_score": float(health_score),
                "category_breakdown": {k: float(v) for k, v in category_breakdown.items()},
                "category_percentages": {k: float(v) for k, v in category_percentages.items()},
                "expense_trend": expense_trend,
                "has_budget": not budgets_df.empty,
                "has_debts": not debts_df.empty
            }
            
            return analysis
            
        except Exception as e:
            logging.error(f"Error en análisis financiero: {e}")
            return {"health_score": 5.0, "total_income": 0, "total_expenses": 0}
    
    def _calculate_health_score(self, savings_rate: float, debt_to_income: float, 
                               net_income: float, total_income: float) -> float:
        """Calcula un score de salud financiera del 1 al 10"""
        try:
            score = 5.0  # Base score
            
            # Factor de ahorro (0-3 puntos)
            if savings_rate >= 0.2:  # 20% o más
                score += 3
            elif savings_rate >= 0.1:  # 10-20%
                score += 2
            elif savings_rate >= 0.05:  # 5-10%
                score += 1
            
            # Factor de deudas (0-2 puntos)
            if debt_to_income <= 0.1:  # 10% o menos
                score += 2
            elif debt_to_income <= 0.3:  # 10-30%
                score += 1
            elif debt_to_income > 0.5:  # Más del 50%
                score -= 2
            
            # Factor de balance (0-1 punto)
            if net_income > 0:
                score += 1
            elif net_income < -total_income * 0.1:  # Déficit mayor al 10%
                score -= 1
            
            return max(1.0, min(10.0, score))
            
        except:
            return 5.0
    
    def _generate_savings_recommendations(self, analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Genera recomendaciones de ahorro"""
        recommendations = []
        
        try:
            savings_rate = analysis.get("savings_rate", 0)
            total_income = analysis.get("total_income", 0)
            net_income = analysis.get("net_income", 0)
            
            # Recomendación de tasa de ahorro
            if savings_rate < 0.1 and net_income > 0:  # Menos del 10% de ahorro
                target_savings = total_income * 0.15  # 15% objetivo
                current_savings = total_income * savings_rate
                additional_needed = target_savings - current_savings
                
                recommendations.append({
                    "type": "savings_increase",
                    "priority": "high",
                    "title": "Aumenta tu tasa de ahorro",
                    "description": f"Tu tasa de ahorro actual es {savings_rate*100:.1f}%. Te recomendamos ahorrar al menos 15% de tus ingresos.",
                    "action": f"Intenta ahorrar ${additional_needed:.2f} adicionales mensualmente",
                    "current_value": f"{savings_rate*100:.1f}%",
                    "target_value": "15%",
                    "impact": "Alto - Mejora tu estabilidad financiera a largo plazo"
                })
            
            # Fondo de emergencia
            monthly_expenses = analysis.get("total_expenses", 0)
            emergency_fund_target = monthly_expenses * 3
            current_savings = analysis.get("total_savings", 0)
            
            if current_savings < emergency_fund_target:
                needed_amount = emergency_fund_target - current_savings
                recommendations.append({
                    "type": "emergency_fund",
                    "priority": "high",
                    "title": "Crea un fondo de emergencia",
                    "description": "Un fondo de emergencia te protege ante gastos inesperados.",
                    "action": f"Ahorra ${needed_amount:.2f} más para completar tu fondo de emergencia",
                    "current_value": f"${current_savings:.2f}",
                    "target_value": f"${emergency_fund_target:.2f}",
                    "impact": "Crítico - Protección ante emergencias financieras"
                })
            
            # Ahorro automático
            if savings_rate > 0 and net_income > 0:
                recommendations.append({
                    "type": "automatic_savings",
                    "priority": "medium",
                    "title": "Automatiza tus ahorros",
                    "description": "Configura transferencias automáticas para ahorrar sin esfuerzo.",
                    "action": "Programa una transferencia automática del 10% de tus ingresos",
                    "current_value": "Manual",
                    "target_value": "Automático",
                    "impact": "Medio - Facilita el hábito de ahorro"
                })
            
            return recommendations
            
        except Exception as e:
            logging.error(f"Error generando recomendaciones de ahorro: {e}")
            return []

    def _generate_expense_reduction_recommendations(self, analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Genera recomendaciones para reducir gastos"""
        recommendations = []
        
        try:
            category_percentages = analysis.get("category_percentages", {})
            total_expenses = analysis.get("total_expenses", 0)
            expense_trend = analysis.get("expense_trend", "stable")
            
            # Verificar categorías con gastos excesivos
            for category, limit in self.recommendation_rules["category_limits"].items():
                if category in category_percentages:
                    current_percentage = category_percentages[category] / 100
                    if current_percentage > limit:
                        excess_amount = total_expenses * (current_percentage - limit)
                        
                        recommendations.append({
                            "type": "expense_reduction",
                            "priority": "medium",
                            "title": f"Reduce gastos en {category.replace('_', ' ').title()}",
                            "description": f"Estás gastando {current_percentage*100:.1f}% en {category}, el límite recomendado es {limit*100:.0f}%",
                            "action": f"Intenta reducir ${excess_amount:.2f} mensuales en esta categoría",
                            "current_value": f"{current_percentage*100:.1f}%",
                            "target_value": f"{limit*100:.0f}%",
                            "impact": "Medio - Libera dinero para ahorros"
                        })
            
            # Tendencia de gastos crecientes
            if expense_trend == "increasing":
                recommendations.append({
                    "type": "expense_trend",
                    "priority": "high",
                    "title": "Controla el crecimiento de gastos",
                    "description": "Tus gastos han aumentado en las últimas semanas",
                    "action": "Revisa tus gastos recientes e identifica gastos innecesarios",
                    "current_value": "Creciente",
                    "target_value": "Estable",
                    "impact": "Alto - Previene desbalance financiero"
                })
            
            # Gastos pequeños frecuentes
            if total_expenses > 0:
                recommendations.append({
                    "type": "small_expenses",
                    "priority": "low",
                    "title": "Revisa gastos pequeños frecuentes",
                    "description": "Los gastos pequeños pueden acumularse significativamente",
                    "action": "Identifica suscripciones o compras pequeñas que puedas eliminar",
                    "current_value": "Sin revisar",
                    "target_value": "Optimizado",
                    "impact": "Bajo - Ahorro incremental"
                })
            
            return recommendations
            
        except Exception as e:
            logging.error(f"Error generando recomendaciones de gastos: {e}")
            return []

    def _generate_debt_management_recommendations(self, analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Genera recomendaciones para manejo de deudas"""
        recommendations = []
        
        try:
            debt_to_income = analysis.get("debt_to_income", 0)
            total_debts = analysis.get("total_debts", 0)
            total_income = analysis.get("total_income", 0)
            has_debts = analysis.get("has_debts", False)
            
            if not has_debts or total_debts == 0:
                return recommendations
            
            # Ratio de deuda alto
            if debt_to_income > self.recommendation_rules["debt_ratio"]["threshold"]:
                recommendations.append({
                    "type": "debt_reduction",
                    "priority": "high",
                    "title": "Reduce tu ratio de deuda",
                    "description": f"Tu ratio deuda-ingreso es {debt_to_income*100:.1f}%, el máximo recomendado es 40%",
                    "action": "Prioriza el pago de deudas con mayor interés",
                    "current_value": f"{debt_to_income*100:.1f}%",
                    "target_value": "40%",
                    "impact": "Crítico - Mejora tu capacidad de pago"
                })
            
            # Estrategia de pago de deudas
            if total_debts > 0:
                monthly_debt_payment = total_debts * 0.05  # 5% mensual sugerido
                
                recommendations.append({
                    "type": "debt_strategy",
                    "priority": "medium",
                    "title": "Implementa estrategia de pago de deudas",
                    "description": "Organiza tus deudas por tasa de interés para optimizar pagos",
                    "action": f"Destina al menos ${monthly_debt_payment:.2f} mensuales para pago de deudas",
                    "current_value": "Sin estrategia",
                    "target_value": "Estrategia activa",
                    "impact": "Alto - Acelera eliminación de deudas"
                })
            
            # Consolidación de deudas
            if debt_to_income > 0.3:
                recommendations.append({
                    "type": "debt_consolidation",
                    "priority": "medium",
                    "title": "Considera consolidar deudas",
                    "description": "La consolidación puede reducir tasas de interés y simplificar pagos",
                    "action": "Investiga opciones de consolidación con bancos locales",
                    "current_value": "Múltiples deudas",
                    "target_value": "Deuda consolidada",
                    "impact": "Medio - Puede reducir intereses"
                })
            
            return recommendations
            
        except Exception as e:
            logging.error(f"Error generando recomendaciones de deudas: {e}")
            return []

    def _generate_budget_recommendations(self, analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Genera recomendaciones de presupuesto"""
        recommendations = []
        
        try:
            has_budget = analysis.get("has_budget", False)
            total_income = analysis.get("total_income", 0)
            total_expenses = analysis.get("total_expenses", 0)
            
            # Sin presupuesto
            if not has_budget and total_income > 0:
                recommendations.append({
                    "type": "budget_creation",
                    "priority": "high",
                    "title": "Crea un presupuesto mensual",
                    "description": "Un presupuesto te ayuda a controlar mejor tus finanzas",
                    "action": "Establece límites de gasto por categoría basados en tus ingresos",
                    "current_value": "Sin presupuesto",
                    "target_value": "Presupuesto activo",
                    "impact": "Alto - Control total de gastos"
                })
            
            # Regla 50/30/20
            if total_income > 0:
                essential_target = total_income * 0.5
                wants_target = total_income * 0.3
                savings_target = total_income * 0.2
                
                recommendations.append({
                    "type": "budget_rule",
                    "priority": "medium",
                    "title": "Aplica la regla 50/30/20",
                    "description": "50% necesidades, 30% deseos, 20% ahorros",
                    "action": f"Necesidades: ${essential_target:.2f}, Deseos: ${wants_target:.2f}, Ahorros: ${savings_target:.2f}",
                    "current_value": "Sin estructura",
                    "target_value": "Regla 50/30/20",
                    "impact": "Alto - Estructura financiera balanceada"
                })
            
            # Revisión de presupuesto
            if has_budget:
                recommendations.append({
                    "type": "budget_review",
                    "priority": "low",
                    "title": "Revisa tu presupuesto mensualmente",
                    "description": "Los presupuestos necesitan ajustes regulares",
                    "action": "Programa una revisión mensual de tu presupuesto",
                    "current_value": "Revisión irregular",
                    "target_value": "Revisión mensual",
                    "impact": "Medio - Mantiene presupuesto actualizado"
                })
            
            return recommendations
            
        except Exception as e:
            logging.error(f"Error generando recomendaciones de presupuesto: {e}")
            return []

    def _generate_investment_recommendations(self, analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Genera recomendaciones básicas de inversión"""
        recommendations = []
        
        try:
            net_income = analysis.get("net_income", 0)
            savings_rate = analysis.get("savings_rate", 0)
            debt_to_income = analysis.get("debt_to_income", 0)
            health_score = analysis.get("health_score", 5)
            
            # Solo recomendar inversiones si la salud financiera es buena
            if health_score >= 7 and debt_to_income < 0.3 and savings_rate > 0.15:
                recommendations.append({
                    "type": "investment_start",
                    "priority": "low",
                    "title": "Considera comenzar a invertir",
                    "description": "Tu situación financiera permite explorar inversiones básicas",
                    "action": "Investiga fondos de inversión conservadores o CDT",
                    "current_value": "Solo ahorros",
                    "target_value": "Ahorros + inversiones",
                    "impact": "Medio - Crecimiento del patrimonio"
                })
            
            # Diversificación básica
            if savings_rate > 0.2:
                recommendations.append({
                    "type": "diversification",
                    "priority": "low",
                    "title": "Diversifica tus ahorros",
                    "description": "No pongas todos los ahorros en una sola cuenta",
                    "action": "Considera diferentes tipos de cuentas de ahorro y productos financieros",
                    "current_value": "Una cuenta",
                    "target_value": "Múltiples productos",
                    "impact": "Medio - Reduce riesgo financiero"
                })
            
            return recommendations
            
        except Exception as e:
            logging.error(f"Error generando recomendaciones de inversión: {e}")
            return []

    def _calculate_priority_score(self, recommendations: List[Dict[str, Any]], 
                                 analysis: Dict[str, Any]) -> float:
        """Calcula un score de prioridad general"""
        try:
            high_priority = len([r for r in recommendations if r.get("priority") == "high"])
            medium_priority = len([r for r in recommendations if r.get("priority") == "medium"])
            low_priority = len([r for r in recommendations if r.get("priority") == "low"])
            
            # Score basado en cantidad y prioridad de recomendaciones
            priority_score = (high_priority * 3) + (medium_priority * 2) + (low_priority * 1)
            
            # Ajustar por salud financiera
            health_score = analysis.get("health_score", 5)
            if health_score < 4:
                priority_score += 5  # Urgencia alta
            elif health_score > 8:
                priority_score = max(1, priority_score - 2)  # Menos urgente
            
            return min(10.0, priority_score)
            
        except:
            return 5.0

    def _prioritize_recommendations(self, recommendations: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Ordena y limita las recomendaciones por prioridad"""
        try:
            # Ordenar por prioridad
            priority_order = {"high": 0, "medium": 1, "low": 2}
            sorted_recs = sorted(
                recommendations, 
                key=lambda x: priority_order.get(x.get("priority", "low"), 2)
            )
            
            # Limitar a máximo 8 recomendaciones para no abrumar al usuario
            return sorted_recs[:8]
            
        except:
            return recommendations[:5]  # Fallback

    def _default_recommendations(self) -> Dict[str, Any]:
        """Recomendaciones por defecto en caso de error"""
        return {
            "recommendations": [
                {
                    "type": "basic_savings",
                    "priority": "medium",
                    "title": "Comienza a ahorrar regularmente",
                    "description": "El ahorro es fundamental para la salud financiera",
                    "action": "Destina al menos 10% de tus ingresos al ahorro",
                    "current_value": "0%",
                    "target_value": "10%",
                    "impact": "Alto - Base de estabilidad financiera"
                },
                {
                    "type": "expense_tracking",
                    "priority": "medium",
                    "title": "Registra todos tus gastos",
                    "description": "Conocer tus gastos es el primer paso para controlarlos",
                    "action": "Anota cada gasto por pequeño que sea",
                    "current_value": "Parcial",
                    "target_value": "Completo",
                    "impact": "Medio - Visibilidad financiera"
                }
            ],
            "priority_score": 5.0,
            "financial_health_score": 5.0,
            "total_recommendations": 2,
            "analysis_date": datetime.now().isoformat()
        }