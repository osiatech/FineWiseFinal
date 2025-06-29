"use client"
import { createContext, useContext, useState, useEffect } from "react"
import type React from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.budget": "Budget",
    "nav.accounts": "Accounts",
    "nav.transactions": "Transactions",
    "nav.charts": "Charts",
    "nav.aiReport": "AI Report",
    "nav.settings": "Settings",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.monthlyBudget": "Monthly Budget (Default Account)",
    "dashboard.spent": "spent",
    "dashboard.used": "used",
    "dashboard.recentTransactions": "Recent Transactions",
    "dashboard.addTransaction": "Add Transaction",
    "dashboard.netWorth": "Net worth",
    "dashboard.assets": "Assets",
    "dashboard.liabilities": "Liabilities",
    "dashboard.spendThisMonth": "Spend This Month",
    "dashboard.seeBudget": "See budget",

    // Settings
    "settings.title": "Settings",
    "settings.subtitle": "Customize your FineWise experience",
    "settings.general": "General",
    "settings.notifications": "Notifications",
    "settings.security": "Security",
    "settings.appearance": "Appearance",
    "settings.categories": "Categories",
    "settings.integrations": "Integrations",
    "settings.dataPrivacy": "Data & Privacy",
    "settings.profileInfo": "Profile Information",
    "settings.firstName": "First Name",
    "settings.lastName": "Last Name",
    "settings.email": "Email",
    "settings.regionalPrefs": "Regional Preferences",
    "settings.currency": "Currency",
    "settings.language": "Language",
    "settings.dateFormat": "Date Format",
    "settings.timeZone": "Time Zone",
    "settings.defaultSettings": "Default Settings",
    "settings.defaultAccount": "Default Account",
    "settings.themeDisplay": "Theme & Display",
    "settings.theme": "Theme",
    "settings.light": "Light",
    "settings.dark": "Dark",
    "settings.system": "Auto (System)",

    // Common
    "common.save": "Save Changes",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.add": "Add",
    "common.remove": "Remove",
    "common.connect": "Connect",
    "common.disconnect": "Disconnect",
    "common.enable": "Enable",
    "common.disable": "Disable",
    "common.create": "Create",
    "common.update": "Update",
    "common.view": "View",
    "common.export": "Export",
    "common.import": "Import",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.loading": "Loading",
    "common.error": "Error",
    "common.success": "Success",

    // Accounts
    "accounts.title": "Accounts",
    "accounts.subtitle": "Manage all your financial accounts in one place",
    "accounts.addAccount": "Add Account",
    "accounts.totalBalance": "Total Balance",
    "accounts.totalAssets": "Total Assets",
    "accounts.totalLiabilities": "Total Liabilities",
    "accounts.netWorth": "Net Worth",
    "accounts.accountName": "Account Name",
    "accounts.accountType": "Account Type",
    "accounts.initialBalance": "Initial Balance",
    "accounts.setAsDefault": "Set as Default",
    "accounts.createAccount": "Create Account",
    "accounts.current": "Current",
    "accounts.savings": "Savings",
    "accounts.checking": "Checking",
    "accounts.credit": "Credit Card",
    "accounts.investment": "Investment",
    "accounts.cash": "Cash",

    // Transactions
    "transactions.title": "Transactions",
    "transactions.subtitle": "Track and manage all your financial transactions",
    "transactions.totalTransactions": "Total Transactions",
    "transactions.totalIncome": "Total Income",
    "transactions.totalExpenses": "Total Expenses",
    "transactions.netAmount": "Net Amount",
    "transactions.addTransaction": "Add Transaction",
    "transactions.scanReceipt": "Scan Receipt with AI",
    "transactions.type": "Type",
    "transactions.amount": "Amount",
    "transactions.account": "Account",
    "transactions.category": "Category",
    "transactions.date": "Date",
    "transactions.description": "Description",
    "transactions.recurring": "Recurring Transaction",
    "transactions.expense": "Expense",
    "transactions.income": "Income",
    "transactions.transfer": "Transfer",

    // Budget
    "budget.title": "My Budgets",
    "budget.subtitle": "Track and manage your spending across different categories",
    "budget.totalBudget": "Total Budget",
    "budget.totalSpent": "Total Spent",
    "budget.remaining": "Remaining",
    "budget.budgetUsed": "Budget Used",
    "budget.createBudget": "Create New Budget",
    "budget.budgetName": "Budget Name",
    "budget.budgetAmount": "Budget Amount",
    "budget.period": "Period",
    "budget.weekly": "Weekly",
    "budget.monthly": "Monthly",
    "budget.quarterly": "Quarterly",
    "budget.yearly": "Yearly",

    // Charts
    "charts.title": "Analytics Dashboard",
    "charts.subtitle": "Visualize your financial data with interactive charts and insights",
    "charts.totalCharts": "Total Charts",
    "charts.visibleCharts": "Visible Charts",
    "charts.hiddenCharts": "Hidden Charts",
    "charts.dataPoints": "Data Points",
    "charts.addChart": "Add Chart",
    "charts.quickAdvice": "Quick Advice",
    "charts.manageCharts": "Manage Charts",

    // AI Report
    "ai.title": "AI Financial Advisor",
    "ai.subtitle": "Get personalized insights and recommendations powered by AI",
    "ai.quickAdvice": "Quick Advice",
    "ai.aiChat": "AI Chat",
    "ai.chatPlaceholder": "Ask me anything about your finances...",
    "ai.financialHealth": "Financial Health Score",
    "ai.spendingAnalysis": "Spending Analysis",
    "ai.savingsOptimization": "Savings Optimization",
    "ai.budgetRebalancing": "Budget Rebalancing",
    "ai.investmentAdvice": "Investment Advice",

    // Categories
    "categories.rental": "Rental",
    "categories.entertainment": "Entertainment",
    "categories.shopping": "Shopping",
    "categories.travel": "Travel",
    "categories.salary": "Salary",
    "categories.freelance": "Freelance",
    "categories.food": "Food & Dining",
    "categories.transportation": "Transportation",
    "categories.utilities": "Utilities",
    "categories.healthcare": "Healthcare",

    // Time periods
    "time.lastWeek": "Last Week",
    "time.lastMonth": "Last Month",
    "time.last3Months": "Last 3 Months",
    "time.last6Months": "Last 6 Months",
    "time.lastYear": "Last Year",
    "time.allTime": "All Time",

    // Status
    "status.active": "Active",
    "status.inactive": "Inactive",
    "status.connected": "Connected",
    "status.disconnected": "Disconnected",
    "status.enabled": "Enabled",
    "status.disabled": "Disabled",
  },
  es: {
    // Navigation
    "nav.dashboard": "Panel",
    "nav.budget": "Presupuesto",
    "nav.accounts": "Cuentas",
    "nav.transactions": "Transacciones",
    "nav.charts": "Gráficos",
    "nav.aiReport": "Reporte IA",
    "nav.settings": "Configuración",

    // Dashboard
    "dashboard.title": "Panel de Control",
    "dashboard.monthlyBudget": "Presupuesto Mensual (Cuenta Predeterminada)",
    "dashboard.spent": "gastado",
    "dashboard.used": "usado",
    "dashboard.recentTransactions": "Transacciones Recientes",
    "dashboard.addTransaction": "Agregar Transacción",
    "dashboard.netWorth": "Patrimonio neto",
    "dashboard.assets": "Activos",
    "dashboard.liabilities": "Pasivos",
    "dashboard.spendThisMonth": "Gastos Este Mes",
    "dashboard.seeBudget": "Ver presupuesto",

    // Settings
    "settings.title": "Configuración",
    "settings.subtitle": "Personaliza tu experiencia con FineWise",
    "settings.general": "General",
    "settings.notifications": "Notificaciones",
    "settings.security": "Seguridad",
    "settings.appearance": "Apariencia",
    "settings.categories": "Categorías",
    "settings.integrations": "Integraciones",
    "settings.dataPrivacy": "Datos y Privacidad",
    "settings.profileInfo": "Información del Perfil",
    "settings.firstName": "Nombre",
    "settings.lastName": "Apellido",
    "settings.email": "Correo Electrónico",
    "settings.regionalPrefs": "Preferencias Regionales",
    "settings.currency": "Moneda",
    "settings.language": "Idioma",
    "settings.dateFormat": "Formato de Fecha",
    "settings.timeZone": "Zona Horaria",
    "settings.defaultSettings": "Configuración Predeterminada",
    "settings.defaultAccount": "Cuenta Predeterminada",
    "settings.themeDisplay": "Tema y Pantalla",
    "settings.theme": "Tema",
    "settings.light": "Claro",
    "settings.dark": "Oscuro",
    "settings.system": "Automático (Sistema)",

    // Common
    "common.save": "Guardar Cambios",
    "common.cancel": "Cancelar",
    "common.edit": "Editar",
    "common.delete": "Eliminar",
    "common.add": "Agregar",
    "common.remove": "Quitar",
    "common.connect": "Conectar",
    "common.disconnect": "Desconectar",
    "common.enable": "Habilitar",
    "common.disable": "Deshabilitar",
    "common.create": "Crear",
    "common.update": "Actualizar",
    "common.view": "Ver",
    "common.export": "Exportar",
    "common.import": "Importar",
    "common.search": "Buscar",
    "common.filter": "Filtrar",
    "common.sort": "Ordenar",
    "common.loading": "Cargando",
    "common.error": "Error",
    "common.success": "Éxito",

    // Accounts
    "accounts.title": "Cuentas",
    "accounts.subtitle": "Gestiona todas tus cuentas financieras en un solo lugar",
    "accounts.addAccount": "Agregar Cuenta",
    "accounts.totalBalance": "Saldo Total",
    "accounts.totalAssets": "Activos Totales",
    "accounts.totalLiabilities": "Pasivos Totales",
    "accounts.netWorth": "Patrimonio Neto",
    "accounts.accountName": "Nombre de la Cuenta",
    "accounts.accountType": "Tipo de Cuenta",
    "accounts.initialBalance": "Saldo Inicial",
    "accounts.setAsDefault": "Establecer como Predeterminada",
    "accounts.createAccount": "Crear Cuenta",
    "accounts.current": "Corriente",
    "accounts.savings": "Ahorros",
    "accounts.checking": "Cuenta Corriente",
    "accounts.credit": "Tarjeta de Crédito",
    "accounts.investment": "Inversión",
    "accounts.cash": "Efectivo",

    // Transactions
    "transactions.title": "Transacciones",
    "transactions.subtitle": "Rastrea y gestiona todas tus transacciones financieras",
    "transactions.totalTransactions": "Total de Transacciones",
    "transactions.totalIncome": "Ingresos Totales",
    "transactions.totalExpenses": "Gastos Totales",
    "transactions.netAmount": "Cantidad Neta",
    "transactions.addTransaction": "Agregar Transacción",
    "transactions.scanReceipt": "Escanear Recibo con IA",
    "transactions.type": "Tipo",
    "transactions.amount": "Cantidad",
    "transactions.account": "Cuenta",
    "transactions.category": "Categoría",
    "transactions.date": "Fecha",
    "transactions.description": "Descripción",
    "transactions.recurring": "Transacción Recurrente",
    "transactions.expense": "Gasto",
    "transactions.income": "Ingreso",
    "transactions.transfer": "Transferencia",

    // Budget
    "budget.title": "Mis Presupuestos",
    "budget.subtitle": "Rastrea y gestiona tus gastos en diferentes categorías",
    "budget.totalBudget": "Presupuesto Total",
    "budget.totalSpent": "Total Gastado",
    "budget.remaining": "Restante",
    "budget.budgetUsed": "Presupuesto Usado",
    "budget.createBudget": "Crear Nuevo Presupuesto",
    "budget.budgetName": "Nombre del Presupuesto",
    "budget.budgetAmount": "Cantidad del Presupuesto",
    "budget.period": "Período",
    "budget.weekly": "Semanal",
    "budget.monthly": "Mensual",
    "budget.quarterly": "Trimestral",
    "budget.yearly": "Anual",

    // Charts
    "charts.title": "Panel de Análisis",
    "charts.subtitle": "Visualiza tus datos financieros con gráficos interactivos e insights",
    "charts.totalCharts": "Total de Gráficos",
    "charts.visibleCharts": "Gráficos Visibles",
    "charts.hiddenCharts": "Gráficos Ocultos",
    "charts.dataPoints": "Puntos de Datos",
    "charts.addChart": "Agregar Gráfico",
    "charts.quickAdvice": "Consejos Rápidos",
    "charts.manageCharts": "Gestionar Gráficos",

    // AI Report
    "ai.title": "Asesor Financiero IA",
    "ai.subtitle": "Obtén insights personalizados y recomendaciones impulsadas por IA",
    "ai.quickAdvice": "Consejos Rápidos",
    "ai.aiChat": "Chat IA",
    "ai.chatPlaceholder": "Pregúntame cualquier cosa sobre tus finanzas...",
    "ai.financialHealth": "Puntuación de Salud Financiera",
    "ai.spendingAnalysis": "Análisis de Gastos",
    "ai.savingsOptimization": "Optimización de Ahorros",
    "ai.budgetRebalancing": "Reequilibrio de Presupuesto",
    "ai.investmentAdvice": "Consejos de Inversión",

    // Categories
    "categories.rental": "Alquiler",
    "categories.entertainment": "Entretenimiento",
    "categories.shopping": "Compras",
    "categories.travel": "Viajes",
    "categories.salary": "Salario",
    "categories.freelance": "Freelance",
    "categories.food": "Comida y Restaurantes",
    "categories.transportation": "Transporte",
    "categories.utilities": "Servicios Públicos",
    "categories.healthcare": "Salud",

    // Time periods
    "time.lastWeek": "Última Semana",
    "time.lastMonth": "Último Mes",
    "time.last3Months": "Últimos 3 Meses",
    "time.last6Months": "Últimos 6 Meses",
    "time.lastYear": "Último Año",
    "time.allTime": "Todo el Tiempo",

    // Status
    "status.active": "Activo",
    "status.inactive": "Inactivo",
    "status.connected": "Conectado",
    "status.disconnected": "Desconectado",
    "status.enabled": "Habilitado",
    "status.disabled": "Deshabilitado",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const stored = localStorage.getItem("language") as Language
    if (stored && (stored === "en" || stored === "es")) {
      setLanguage(stored)
    } else {
      // Si no hay idioma guardado, usar español por defecto
      setLanguage("es")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
