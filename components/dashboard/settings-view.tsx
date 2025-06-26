"use client"
import { useState } from "react"
import { Button } from "components/dashboard/ui/button"
import { Input } from "components/dashboard/ui/input"
import { Label } from "components/dashboard/ui/label"
import { Switch } from "components/dashboard/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/dashboard/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/dashboard/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "components/dashboard/ui/card"
import { Badge } from "components/dashboard/ui/badge"
import { Separator } from "components/dashboard/ui/separator"
import {
  Settings,
  User,
  Bell,
  Palette,
  Database,
  Link,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  Eye,
  Globe,
  Smartphone,
  Mail,
  DollarSign,
  Tag,
  Zap,
  Cloud,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { useTheme } from "lib/contexts/theme-context"
import { useLanguage } from "lib/contexts/language-context"

export function SettingsView() {
  const { actualTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    transactionNotifications: true,
    weeklyReports: false,
    monthlyReports: true,
    securityAlerts: true,
    marketingEmails: false,
  })

  const [preferences, setPreferences] = useState({
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    timeZone: "America/New_York",
    defaultAccount: "personal",
    theme: actualTheme,
  })

  const [categories, setCategories] = useState([
    { id: 1, name: "Rental", color: "#ef4444", transactions: 12 },
    { id: 2, name: "Shopping", color: "#ec4899", transactions: 45 },
    { id: 3, name: "Entertainment", color: "#8b5cf6", transactions: 23 },
    { id: 4, name: "Food", color: "#06b6d4", transactions: 67 },
    { id: 5, name: "Transportation", color: "#10b981", transactions: 34 },
  ])

  const connectedApps = [
    { name: "Google Drive", status: "connected", icon: "📁", description: "Backup and sync your data" },
    { name: "Dropbox", status: "disconnected", icon: "📦", description: "Cloud storage integration" },
    { name: "Mint", status: "connected", icon: "🌿", description: "Import transactions" },
    { name: "YNAB", status: "disconnected", icon: "💰", description: "Budget sync" },
  ]

  // Non-functional theme change handler
  const handleThemeChange = (value: string) => {
    // Do nothing - just for visual purposes
  }

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
              {t("settings.title")}
            </h1>
            <p className="text-gray-600 mt-1">{t("settings.subtitle")}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-white">
          <TabsTrigger value="general">{t("settings.general")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("settings.notifications")}</TabsTrigger>
          <TabsTrigger value="security">{t("settings.security")}</TabsTrigger>
          <TabsTrigger value="appearance">{t("settings.appearance")}</TabsTrigger>
          <TabsTrigger value="categories">{t("settings.categories")}</TabsTrigger>
          <TabsTrigger value="integrations">{t("settings.integrations")}</TabsTrigger>
          <TabsTrigger value="data">{t("settings.dataPrivacy")}</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{t("settings.profileInformation")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">PA</span>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">{t("settings.firstName")}</Label>
                      <Input id="firstName" defaultValue="Usuario Prueba" className="bg-white" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t("settings.lastName")}</Label>
                      <Input id="lastName" defaultValue="Testing" className="bg-white" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">{t("settings.email")}</Label>
                    <Input id="email" defaultValue="usertesting@gmail.com" className="bg-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>{t("settings.regionalPreferences")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">{t("settings.currency")}</Label>
                  <Select
                    value={preferences.currency}
                    onValueChange={(value) => setPreferences({ ...preferences, currency: value })}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">{t("settings.language")}</Label>
                  <Select value={language} onValueChange={(value: "en" | "es") => setLanguage(value)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateFormat">{t("settings.dateFormat")}</Label>
                  <Select
                    value={preferences.dateFormat}
                    onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">{t("settings.timeZone")}</Label>
                  <Select
                    value={preferences.timeZone}
                    onValueChange={(value) => setPreferences({ ...preferences, timeZone: value })}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>{t("settings.defaultSettings")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="defaultAccount">{t("settings.defaultAccount")}</Label>
                <Select
                  value={preferences.defaultAccount}
                  onValueChange={(value) => setPreferences({ ...preferences, defaultAccount: value })}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="personal">Personal ($152,124.40)</SelectItem>
                    <SelectItem value="work">Work ($5,941.00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Push Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: "budgetAlerts",
                  label: "Budget Alerts",
                  description: "Get notified when you're close to budget limits",
                },
                {
                  key: "transactionNotifications",
                  label: "Transaction Notifications",
                  description: "Receive alerts for new transactions",
                },
                {
                  key: "securityAlerts",
                  label: "Security Alerts",
                  description: "Important security and login notifications",
                },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div>
                    <h4 className="font-medium">{item.label}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: "weeklyReports",
                  label: "Weekly Reports",
                  description: "Weekly summary of your financial activity",
                },
                {
                  key: "monthlyReports",
                  label: "Monthly Reports",
                  description: "Detailed monthly financial reports",
                },
                {
                  key: "marketingEmails",
                  label: "Marketing Emails",
                  description: "Product updates and promotional content",
                },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div>
                    <h4 className="font-medium">{item.label}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Password & Authentication</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div>
                  <h4 className="font-medium">Password</h4>
                  <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Not Enabled</Badge>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>Active Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div>
                    <h4 className="font-medium">Current Session</h4>
                    <p className="text-sm text-gray-500">Chrome on macOS • Active now</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Current</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div>
                    <h4 className="font-medium">Mobile App</h4>
                    <p className="text-sm text-gray-500">iPhone • Last active 2 hours ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>API Keys</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div>
                  <h4 className="font-medium">Personal API Key</h4>
                  <p className="text-sm text-gray-500">For third-party integrations</p>
                </div>
                <Button variant="outline">Generate Key</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>{t("settings.themeDisplay")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme">{t("settings.theme")}</Label>
                <Select value={actualTheme} onValueChange={handleThemeChange}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="light">{t("settings.light")}</SelectItem>
                    <SelectItem value="dark">{t("settings.dark")}</SelectItem>
                    <SelectItem value="system">{t("settings.system")}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">Theme automatically follows your system preferences</p>
              </div>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium">Dashboard Layout</h4>
                <div className="grid grid-cols-3 gap-4">
                  {["Compact", "Standard", "Spacious"].map((layout) => (
                    <div key={layout} className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 bg-white">
                      <div className="w-full h-16 bg-gray-200 rounded mb-2"></div>
                      <p className="text-sm text-center">{layout}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Chart Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Animated Charts</h4>
                  <p className="text-sm text-gray-500">Enable smooth animations for charts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">High Contrast Mode</h4>
                  <p className="text-sm text-gray-500">Better visibility for charts and data</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories */}
        <TabsContent value="categories" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Tag className="h-5 w-5" />
                  <span>Transaction Categories</span>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <div>
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-sm text-gray-500">{category.transactions} transactions</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Auto-Categorization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Smart Categorization</h4>
                  <p className="text-sm text-gray-500">Automatically categorize transactions</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Learn from Manual Changes</h4>
                  <p className="text-sm text-gray-500">Improve accuracy over time</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Link className="h-5 w-5" />
                <span>Connected Apps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedApps.map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{app.icon}</span>
                      <div>
                        <h4 className="font-medium">{app.name}</h4>
                        <p className="text-sm text-gray-500">{app.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={app.status === "connected" ? "default" : "secondary"}>
                        {app.status === "connected" ? "Connected" : "Disconnected"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {app.status === "connected" ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="h-5 w-5" />
                <span>Cloud Sync</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto Backup</h4>
                  <p className="text-sm text-gray-500">Automatically backup your data</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Sync Across Devices</h4>
                  <p className="text-sm text-gray-500">Keep data synchronized across all devices</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data & Privacy */}
        <TabsContent value="data" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Data Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div>
                  <h4 className="font-medium">Export Data</h4>
                  <p className="text-sm text-gray-500">Download all your financial data</p>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div>
                  <h4 className="font-medium">Import Data</h4>
                  <p className="text-sm text-gray-500">Import data from other financial apps</p>
                </div>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Privacy Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Analytics & Insights</h4>
                  <p className="text-sm text-gray-500">Allow us to analyze your data for insights</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Usage Analytics</h4>
                  <p className="text-sm text-gray-500">Help improve the app with usage data</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span>Danger Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <h4 className="font-medium text-red-900">Delete Account</h4>
                  <p className="text-sm text-red-700">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-gray-900 hover:bg-gray-800 text-white">
          <CheckCircle className="h-4 w-4 mr-2" />
          {t("common.save")}
        </Button>
      </div>
    </div>
  )
}
