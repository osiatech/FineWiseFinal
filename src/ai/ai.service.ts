// src/ai/ai.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AiService {
  private readonly AI_SERVICE_URL = 'http://localhost:8000';

  constructor(private readonly httpService: HttpService) {}

  async predictWeeklyExpenses(userId: string, transactions: any[], budgets: any[] = [], debts: any[] = []) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.AI_SERVICE_URL}/predict/weekly-expenses`, {
          user_id: userId,
          transactions,
          budgets,
          debts
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error en predicción de gastos: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async detectAnomalies(userId: string, transactions: any[]) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.AI_SERVICE_URL}/detect/anomalies`, {
          user_id: userId,
          transactions,
          budgets: [],
          debts: []
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error en detección de anomalías: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getRecommendations(userId: string, transactions: any[], budgets: any[] = [], debts: any[] = []) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.AI_SERVICE_URL}/recommendations`, {
          user_id: userId,
          transactions,
          budgets,
          debts
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error en recomendaciones: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getComprehensiveAnalysis(userId: string, transactions: any[], budgets: any[] = [], debts: any[] = []) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.AI_SERVICE_URL}/financial-analysis`, {
          user_id: userId,
          transactions,
          budgets,
          debts
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Error en análisis completo: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}