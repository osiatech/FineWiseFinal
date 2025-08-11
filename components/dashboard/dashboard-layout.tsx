"use client"

import type React from "react"
import { CreditCard, Home, Menu, PieChart, Settings, Sun, Moon, Wallet, Brain, ArrowUpDown } from "lucide-react"
import { Button } from "components/dashboard/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "components/dashboard/ui/sheet"
import { Switch } from "components/dashboard/ui/switch"
import Image from "next/image"
import { useTheme } from "lib/contexts/theme-context"
import { useLanguage } from "lib/contexts/language-context"
import { usePathname } from "next/navigation"

function Sidebar() {
  const { actualTheme } = useTheme()
  const { t } = useLanguage()
  const pathname = usePathname()
  const isDarkMode = actualTheme === "dark"

  // Non-functional toggle - just for display
  const handleThemeToggle = () => {
    // Do nothing - just for visual purposes
  }

  const menuNavigation = [
    { name: t("nav.dashboard"), href: "/dashboard", icon: Home },
    { name: t("nav.budget"), href: "/dashboard/budget", icon: Wallet },
    { name: t("nav.debts"), href: "/dashboard/debts", icon: CreditCard },
    // { name: t("nav.accounts"), href: "/dashboard/accounts", icon: CreditCard },
    { name: t("nav.transactions"), href: "/dashboard/transactions", icon: ArrowUpDown },
    { name: t("nav.charts"), href: "/dashboard/charts", icon: PieChart },
    { name: t("nav.aiReport"), href: "/dashboard/ai-report", icon: Brain },
  ]

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo Section */}
      <div className="flex h-16 items-center px-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <Image src="/images/finewise-logo.png" alt="FineWise" width={32} height={32} className="rounded-full" />
          <span className="text-xl font-bold text-gray-800">FineWise</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Menu Section */}
        <div className="px-6 py-4">
          <h3 className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">MENU</h3>
          <nav className="space-y-1">
            {menuNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.name}
                </a>
              )
            })}
          </nav>
        </div>

        {/* Preferences Section */}
        <div className="px-6 py-4 border-t border-gray-100 mt-auto">
          <h3 className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">PREFERENCIAS</h3>

          {/* Settings */}
          <a
            href="/dashboard/settings"
            className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors mb-3 ${
              pathname === "/dashboard/settings"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Settings
              className={`mr-3 h-5 w-5 flex-shrink-0 ${
                pathname === "/dashboard/settings" ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            {t("nav.settings")}
          </a>

          {/* Dark/Light Mode Toggle - Visual only */}
          <div className="flex items-center justify-between rounded-lg px-3 py-2.5">
            <div className="flex items-center">
              {isDarkMode ? (
                <Moon className="mr-3 h-5 w-5 text-gray-400" />
              ) : (
                <Sun className="mr-3 h-5 w-5 text-gray-400" />
              )}
              <span className="text-sm font-medium text-gray-700">
                {isDarkMode ? t("settings.dark") : t("settings.light")}
              </span>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={handleThemeToggle}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-h-0">{children}</div>
    </div>
  )
}
