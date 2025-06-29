"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "components/dashboard/ui/dialog"
import type React from "react"

import { Button } from "components/dashboard/ui/button"
import { Input } from "components/dashboard/ui/input"
import { Label } from "components/dashboard/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/dashboard/ui/select"
import { Checkbox } from "components/dashboard/ui/checkbox"
import { useState } from "react"
import { useLanguage } from "lib/contexts/language-context"

interface CreateAccountModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateAccountModal({ open, onOpenChange }: CreateAccountModalProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    accountName: "",
    accountType: "current",
    initialBalance: "0.00",
    setAsDefault: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Creating account:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      accountName: "",
      accountType: "current",
      initialBalance: "0.00",
      setAsDefault: false,
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
    // Reset form
    setFormData({
      accountName: "",
      accountType: "current",
      initialBalance: "0.00",
      setAsDefault: false,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{t("accounts.createAccount")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Name */}
          <div className="space-y-2">
            <Label htmlFor="accountName" className="text-sm font-medium text-gray-700">
              {t("accounts.accountName")}
            </Label>
            <Input
              id="accountName"
              placeholder="ej., Cuenta Principal"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              className="w-full"
              required
            />
          </div>

          {/* Account Type */}
          <div className="space-y-2">
            <Label htmlFor="accountType" className="text-sm font-medium text-gray-700">
              {t("accounts.accountType")}
            </Label>
            <Select
              value={formData.accountType}
              onValueChange={(value) => setFormData({ ...formData, accountType: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">{t("accounts.current")}</SelectItem>
                <SelectItem value="savings">{t("accounts.savings")}</SelectItem>
                <SelectItem value="checking">{t("accounts.checking")}</SelectItem>
                <SelectItem value="credit">{t("accounts.credit")}</SelectItem>
                <SelectItem value="investment">{t("accounts.investment")}</SelectItem>
                <SelectItem value="cash">{t("accounts.cash")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Initial Balance */}
          <div className="space-y-2">
            <Label htmlFor="initialBalance" className="text-sm font-medium text-gray-700">
              {t("accounts.initialBalance")}
            </Label>
            <Input
              id="initialBalance"
              type="number"
              step="0.01"
              value={formData.initialBalance}
              onChange={(e) => setFormData({ ...formData, initialBalance: e.target.value })}
              className="w-full"
            />
          </div>

          {/* Set as Default */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="setAsDefault"
                checked={formData.setAsDefault}
                onCheckedChange={(checked) => setFormData({ ...formData, setAsDefault: checked as boolean })}
              />
              <Label htmlFor="setAsDefault" className="text-sm font-medium text-gray-700">
                {t("accounts.setAsDefault")}
              </Label>
            </div>
            <p className="text-xs text-gray-500 ml-6">Esta cuenta será seleccionada por defecto para transacciones</p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              {t("common.cancel")}
            </Button>
            <Button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white">
              {t("common.create")} {t("accounts.account")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
