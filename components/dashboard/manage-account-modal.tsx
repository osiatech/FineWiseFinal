"use client"
import { Dialog, DialogContent } from "components/dashboard/ui/dialog"
import { Button } from "components/dashboard/ui/button"
import { Input } from "components/dashboard/ui/input"
import { Label } from "components/dashboard/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/dashboard/ui/tabs"
import { Badge } from "components/dashboard/ui/badge"
import { X, MoreHorizontal, Plus, User, Shield, Upload, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/dashboard/ui/dropdown-menu"
import { useState } from "react"

interface ManageAccountModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ManageAccountModal({ open, onOpenChange }: ManageAccountModalProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Usuario Prueba",
    lastName: "Testing",
    avatar: "/images/finewise-logo.png",
  })

  const handleSaveProfile = () => {
    // Handle profile save logic here
    setIsEditingProfile(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[700px] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className="w-72 bg-gray-50 border-r border-gray-200 p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">Account</h2>
              <p className="text-sm text-gray-500 mt-1">Manage your account info.</p>
            </div>

            <Tabs defaultValue="profile" orientation="vertical" className="w-full">
              <TabsList className="grid w-full grid-rows-2 h-auto bg-transparent p-0 space-y-2">
                <TabsTrigger
                  value="profile"
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg border-0"
                >
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Profile</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="w-full justify-start px-4 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg border-0"
                >
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Security</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Main Content */}
          <div className="flex-1 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 z-10"
            >
              <X className="h-4 w-4" />
            </Button>

            <Tabs defaultValue="profile" className="h-full">
              {/* Profile Tab Content */}
              <TabsContent value="profile" className="h-full p-8 space-y-8 overflow-y-auto">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-8">Profile details</h3>

                  {/* Profile Section */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Profile</h4>
                      <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">UP</span>
                          </div>
                          <span className="text-lg font-medium text-gray-900">
                            {profileData.firstName} {profileData.lastName}
                          </span>
                        </div>
                        <Button variant="outline" onClick={() => setIsEditingProfile(true)} className="px-6">
                          Update profile
                        </Button>
                      </div>
                    </div>

                    {/* Email Addresses Section */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Email addresses</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-900 font-medium">usuariotesting@gmail.com</span>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              Primary
                            </Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Remove</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-600 h-12 rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add email address
                        </Button>
                      </div>
                    </div>

                    {/* Connected Accounts Section */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Connected accounts</h4>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                            <div className="w-6 h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">G</span>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Google</span>
                            <p className="text-sm text-gray-500">googleaccount@gmail.com</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-red-600">Disconnect</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Security Tab Content */}
              <TabsContent value="security" className="h-full p-8 space-y-8 overflow-y-auto">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-8">Security settings</h3>

                  <div className="space-y-6">
                    {/* Password Section */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Password</h4>
                      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Password</p>
                            <p className="text-sm text-gray-500">Last updated 30 days ago</p>
                          </div>
                          <Button variant="outline" className="px-6">
                            Change password
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Two-factor authentication</h4>
                      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Authenticator app</p>
                            <p className="text-sm text-gray-500">Not configured</p>
                          </div>
                          <Button variant="outline" className="px-6">
                            Set up
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Active Sessions */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Active sessions</h4>
                      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Current session</p>
                            <p className="text-sm text-gray-500">Chrome on macOS • Active now</p>
                          </div>
                          <Button variant="outline" disabled className="px-6">
                            Current
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Update Profile Modal Overlay */}
            {isEditingProfile && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Update profile</h3>

                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xl">PA</span>
                      </div>
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 text-center">Recommended size 1:1, up to 10MB.</p>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                          First name
                        </Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                          Last name
                        </Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Modal Actions */}
                  <div className="flex justify-end space-x-3 mt-8">
                    <Button variant="outline" onClick={() => setIsEditingProfile(false)} className="px-6">
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile} className="bg-gray-900 hover:bg-gray-800 text-white px-6">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
