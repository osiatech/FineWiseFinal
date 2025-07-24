import { useState } from 'react';
import axios from 'axios';

const API_BASE = '/api'; // El API

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predictExpenses = async (userId: string, transactions: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/ai/predict/${userId}`, {
        transactions
      });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en predicción');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const detectAnomalies = async (userId: string, transactions: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/ai/anomalies/${userId}`, {
        transactions
      });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en detección');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = async (userId: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/ai/recommendations/${userId}`, data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en recomendaciones');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getFullAnalysis = async (userId: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/ai/analysis/${userId}`, data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en análisis');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    predictExpenses,
    detectAnomalies,
    getRecommendations,
    getFullAnalysis
  };
};