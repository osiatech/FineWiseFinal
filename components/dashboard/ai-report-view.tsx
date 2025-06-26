"use client"
import { useState } from "react"
import { Button } from "components/dashboard/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "components/dashboard/ui/card"
import { Input } from "components/dashboard/ui/input"
import { Badge } from "components/dashboard/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/dashboard/ui/tabs"
import {
  Brain,
  TrendingUp,
  Target,
  PiggyBank,
  AlertTriangle,
  Lightbulb,
  Send,
  Sparkles,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react"

export function AIReportView() {
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      type: "ai",
      message:
        "Hello! I'm your AI Financial Advisor. I've analyzed your spending patterns and I'm ready to help you optimize your finances. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage = {
      type: "user",
      message: chatInput,
      timestamp: new Date(),
    }

    setChatMessages([...chatMessages, userMessage])
    setChatInput("")
    setIsGenerating(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: "ai",
        message: getAIResponse(chatInput),
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, aiResponse])
      setIsGenerating(false)
    }, 2000)
  }

  const getAIResponse = (input: string) => {
    const responses = [
      "Based on your spending patterns, I recommend setting aside 20% of your income for savings. You're currently saving 15%, which is good, but there's room for improvement.",
      "I notice you spend $850 on shopping monthly. Consider implementing a 24-hour rule before making non-essential purchases to reduce impulse buying.",
      "Your rental expenses are well within the recommended 30% of income. However, I suggest reviewing your entertainment budget as it's slightly above average.",
      "Great question! I recommend creating an emergency fund covering 6 months of expenses. Based on your current spending, that would be approximately $25,200.",
      "Your investment allocation looks conservative. Consider diversifying with 60% stocks and 40% bonds for better long-term growth potential.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const quickAdviceCards = [
    {
      title: "Spending Analysis",
      description: "Get insights on your spending habits",
      icon: BarChart3,
      color: "bg-blue-500",
      advice: "You're spending 15% more on dining out compared to last month. Consider meal planning to reduce costs.",
    },
    {
      title: "Savings Optimization",
      description: "Maximize your savings potential",
      icon: PiggyBank,
      color: "bg-green-500",
      advice:
        "You could save an additional $340/month by optimizing your subscriptions and reducing impulse purchases.",
    },
    {
      title: "Budget Rebalancing",
      description: "Optimize your budget allocation",
      icon: Target,
      color: "bg-purple-500",
      advice:
        "Your entertainment budget is 23% above recommended levels. Reallocating $200 to savings would improve your financial health.",
    },
    {
      title: "Investment Advice",
      description: "Smart investment recommendations",
      icon: TrendingUp,
      color: "bg-orange-500",
      advice:
        "With your current savings rate, consider investing in low-cost index funds for long-term wealth building.",
    },
  ]

  const aiInsights = [
    {
      type: "positive",
      icon: TrendingUp,
      title: "Great Progress!",
      description: "Your savings rate has improved by 12% this quarter",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Budget Alert",
      description: "Entertainment spending is 23% above your target",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      type: "opportunity",
      icon: Lightbulb,
      title: "Optimization Opportunity",
      description: "You could save $127/month by consolidating subscriptions",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ]

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      <title>AI Report | Dashboard</title>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Financial Advisor
            </h1>
            <p className="text-gray-600 mt-1">Get personalized insights and recommendations powered by AI</p>
          </div>
        </div>
      </div>

      {/* AI Insights Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {aiInsights.map((insight, index) => (
          <Card key={index} className={`${insight.bg} border-0`}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <insight.icon className={`h-6 w-6 ${insight.color} mt-1`} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                  <p className="text-sm text-gray-700">{insight.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="quick-advice" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quick-advice">Quick Advice</TabsTrigger>
          <TabsTrigger value="ai-chat">AI Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="quick-advice" className="space-y-6">
          {/* Quick Advice Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {quickAdviceCards.map((card, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                      <card.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                      <p className="text-sm text-gray-500">{card.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Sparkles className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{card.advice}</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 hover:bg-gray-100 transition-colors" variant="outline">
                    <Zap className="h-4 w-4 mr-2" />
                    Get Detailed Analysis
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Financial Health Score */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Financial Health Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-green-600">78/100</div>
                  <p className="text-sm text-gray-600">Good Financial Health</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800">+5 this month</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Savings Rate</span>
                  <span className="font-medium">85/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Debt Management</span>
                  <span className="font-medium">95/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Budget Adherence</span>
                  <span className="font-medium">65/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Investment Diversification</span>
                  <span className="font-medium">70/100</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-chat" className="space-y-6">
          {/* AI Chat Interface */}
          <Card className="h-96">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>Chat with AI Advisor</span>
                <Badge variant="secondary" className="ml-auto">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Powered
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
                {isGenerating && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask me anything about your finances..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!chatInput.trim() || isGenerating}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Questions</CardTitle>
              <p className="text-sm text-gray-600">Click on any question to get instant advice</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                {[
                  "How can I reduce my monthly expenses?",
                  "What's the best way to increase my savings?",
                  "Should I invest more or pay off debt first?",
                  "How much should I have in my emergency fund?",
                  "What are some good investment options for me?",
                  "How can I improve my credit score?",
                ].map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-left h-auto p-3 hover:bg-blue-50"
                    onClick={() => {
                      setChatInput(question)
                      handleSendMessage()
                    }}
                  >
                    <Lightbulb className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{question}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
