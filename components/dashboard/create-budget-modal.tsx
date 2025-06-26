"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "components/dashboard/ui/dialog"
import type React from "react"

import { Button } from "components/dashboard/ui/button"
import { Input } from "components/dashboard/ui/input"
import { Label } from "components/dashboard/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/dashboard/ui/select"
import { Textarea } from "components/dashboard/ui/textarea"
import { ShoppingBag, Home, Car, Utensils, Plane, Heart, Gamepad2, Book } from "lucide-react"
import { useState } from "react"

interface CreateBudgetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const budgetCategories = [
  { value: "shopping", label: "Shopping", icon: ShoppingBag, color: "text-pink-600" },
  { value: "home", label: "Home & Garden", icon: Home, color: "text-green-600" },
  { value: "transportation", label: "Transportation", icon: Car, color: "text-blue-600" },
  { value: "food", label: "Food & Dining", icon: Utensils, color: "text-orange-600" },
  { value: "travel", label: "Travel", icon: Plane, color: "text-purple-600" },
  { value: "health", label: "Health & Fitness", icon: Heart, color: "text-red-600" },
  { value: "entertainment", label: "Entertainment", icon: Gamepad2, color: "text-indigo-600" },
  { value: "education", label: "Education", icon: Book, color: "text-yellow-600" },
]

export function CreateBudgetModal({ open, onOpenChange }: CreateBudgetModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    amount: "",
    description: "",
    period: "monthly",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating budget:", formData)
    onOpenChange(false)
    setFormData({
      name: "",
      category: "",
      amount: "",
      description: "",
      period: "monthly",
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
    setFormData({
      name: "",
      category: "",
      amount: "",
      description: "",
      period: "monthly",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Budget</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Budget Name</Label>
            <Input
              id="name"
              placeholder="e.g., Monthly Groceries"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {budgetCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center space-x-2">
                      <category.icon className={`h-4 w-4 ${category.color}`} />
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Budget Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Period</Label>
              <Select value={formData.period} onValueChange={(value) => setFormData({ ...formData, period: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add notes about this budget..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Create Budget
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
