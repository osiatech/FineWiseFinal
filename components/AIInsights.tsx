// components/AIInsights.tsx
import React, { useEffect, useState } from 'react';
import { useAI } from '@/hooks/useAI';

interface AIInsightsProps {
  userId: string;
  transactions: any[];
  budgets?: any[];
  debts?: any[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({
  userId,
  transactions,
  budgets = [],
  debts = []
}) => {
  const { loading, error, getFullAnalysis } = useAI();
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    if (transactions.length > 0) {
      loadAnalysis();
    }
  }, [transactions]);

  const loadAnalysis = async () => {
    try {
      const result = await getFullAnalysis(userId, {
        transactions,
        budgets,
        debts
      });
      setAnalysis(result);
    } catch (err) {
      console.error('Error cargando análisis:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={loadAnalysis}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center p-8 text-gray-500">
        No hay suficientes datos para el análisis de IA
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Predicciones */}
      {analysis.results.predictions && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            📊 Predicción Semanal
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            ${analysis.results.predictions.total_predicted.toFixed(2)}
          </p>
          <p className="text-sm text-blue-600">
            Confianza: {(analysis.results.predictions.confidence_score * 100).toFixed(1)}%
          </p>
        </div>
      )}

      {/* Anomalías */}
      {analysis.results.anomalies && analysis.results.anomalies.anomalies.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-4">
            ⚠️ Anomalías Detectadas
          </h3>
          <div className="space-y-2">
            {analysis.results.anomalies.anomalies.slice(0, 3).map((anomaly: any, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  anomaly.severity === 'high' ? 'bg-red-100 text-red-800' :
                  anomaly.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {anomaly.severity.toUpperCase()}
                </span>
                <p className="text-sm text-red-700">{anomaly.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recomendaciones */}
      {analysis.results.recommendations && analysis.results.recommendations.recommendations.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            💡 Recomendaciones Personalizadas
          </h3>
          <div className="space-y-3">
            {analysis.results.recommendations.recommendations.slice(0, 3).map((rec: any, index: number) => (
              <div key={index} className="border-l-4 border-green-400 pl-4">
                <h4 className="font-semibold text-green-800">{rec.title}</h4>
                <p className="text-sm text-green-700 mt-1">{rec.description}</p>
                <p className="text-xs text-green-600 mt-2 font-medium">{rec.action}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumen financiero */}
      {analysis.results.summary && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📈 Resumen Financiero
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ${analysis.results.summary.total_income.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Ingresos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                ${analysis.results.summary.total_expenses.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Gastos</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${
                analysis.results.summary.net_balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${analysis.results.summary.net_balance.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Balance</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {analysis.results.summary.transaction_count}
              </p>
              <p className="text-sm text-gray-600">Transacciones</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};