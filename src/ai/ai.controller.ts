import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('predict/:userId')
  async predictExpenses(
    @Param('userId') userId: string,
    @Body() data: { transactions: any[]; budgets?: any[]; debts?: any[] }
  ) {
    return this.aiService.predictWeeklyExpenses(
      userId,
      data.transactions,
      data.budgets,
      data.debts
    );
  }

  @Post('anomalies/:userId')
  async detectAnomalies(
    @Param('userId') userId: string,
    @Body() data: { transactions: any[] }
  ) {
    return this.aiService.detectAnomalies(userId, data.transactions);
  }

  @Post('recommendations/:userId')
  async getRecommendations(
    @Param('userId') userId: string,
    @Body() data: { transactions: any[]; budgets?: any[]; debts?: any[] }
  ) {
    return this.aiService.getRecommendations(
      userId,
      data.transactions,
      data.budgets,
      data.debts
    );
  }

  @Post('analysis/:userId')
  async getFullAnalysis(
    @Param('userId') userId: string,
    @Body() data: { transactions: any[]; budgets?: any[]; debts?: any[] }
  ) {
    return this.aiService.getComprehensiveAnalysis(
      userId,
      data.transactions,
      data.budgets,
      data.debts
    );
  }
}