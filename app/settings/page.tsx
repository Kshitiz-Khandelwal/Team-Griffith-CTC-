"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  Eye,
  EyeOff,
  Search,
  Shield,
  User,
  Users,
  AlertTriangle,
  Trash2,
  Upload,
  Save,
  ChevronRight,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false)
  const [deleteEmail, setDeleteEmail] = useState("")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <div className="space-y-1 py-2">
              <h3 className="text-sm font-medium">Settings</h3>
              <Button
                variant={activeTab === "account" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("account")}
              >
                <User className="mr-2 h-4 w-4" />
                Account & Security
              </Button>
              <Button
                variant={activeTab === "notifications" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button
                variant={activeTab === "privacy" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("privacy")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Privacy & Data
              </Button>
              {/* Club representatives would see this option */}
              <Button
                variant={activeTab === "club" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("club")}
              >
                <Users className="mr-2 h-4 w-4" />
                Club Management
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-6">
          {activeTab === "account" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and profile picture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Change Picture
                      </Button>
                      <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input id="full-name" defaultValue="John Doe" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="usn">University Serial Number (USN)</Label>
                      <Input id="usn" defaultValue="1MS21CS123" readOnly className="bg-muted" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch/Department</Label>
                      <Select defaultValue="cs">
                        <SelectTrigger id="branch">
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="ece">Electronics & Communication</SelectItem>
                          <SelectItem value="me">Mechanical Engineering</SelectItem>
                          <SelectItem value="civil">Civil Engineering</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year">Year of Study</Label>
                      <Select defaultValue="3">
                        <SelectTrigger id="year">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Year</SelectItem>
                          <SelectItem value="2">2nd Year</SelectItem>
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="john.doe@university.edu" readOnly className="bg-muted" />
                    <p className="text-xs text-muted-foreground">
                      Your email address is used for login and cannot be changed.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>

                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password must be at least 8 characters with 1 uppercase letter and 1 special character
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button>Update Password</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="2fa" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="login-alerts">New Device Login Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when someone logs in from a new device
                        </p>
                      </div>
                      <Switch id="login-alerts" defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Login Activity</h3>

                    <div className="space-y-4">
                      <div className="rounded-md border">
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Current Session</p>
                              <p className="text-sm text-muted-foreground">Chrome on Windows • Bangalore, India</p>
                            </div>
                            <div className="flex items-center">
                              <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                              <span className="text-sm">Active now</span>
                            </div>
                          </div>
                        </div>
                        <Separator />
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Previous Login</p>
                              <p className="text-sm text-muted-foreground">Safari on iPhone • Bangalore, India</p>
                            </div>
                            <div className="text-sm text-muted-foreground">2 days ago</div>
                          </div>
                        </div>
                        <Separator />
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Previous Login</p>
                              <p className="text-sm text-muted-foreground">Chrome on MacBook • Bangalore, India</p>
                            </div>
                            <div className="text-sm text-muted-foreground">5 days ago</div>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        View All Login Activity
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Danger Zone</h3>

                    <Dialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Account Permanently
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Account</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all your
                            data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            <p className="text-sm">
                              All your data, including event RSVPs, will be permanently deleted.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="delete-email">Enter your email address to confirm</Label>
                            <Input
                              id="delete-email"
                              placeholder="your.email@university.edu"
                              value={deleteEmail}
                              onChange={(e) => setDeleteEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDeleteAccountOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" disabled={deleteEmail !== "john.doe@university.edu"}>
                            Delete Account
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Event & Social Notifications</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="event-reminders">Upcoming Event Reminders</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications for events you RSVP'd to</p>
                      </div>
                      <Switch id="event-reminders" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="friend-rsvp">Friend RSVP Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified when friends join an event</p>
                      </div>
                      <Switch id="friend-rsvp" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="trending-events">Trending Campus Events</Label>
                        <p className="text-sm text-muted-foreground">Receive weekly highlights of popular events</p>
                      </div>
                      <Switch id="trending-events" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="club-updates">Club Announcements & Updates</Label>
                        <p className="text-sm text-muted-foreground">Get updates from clubs you follow</p>
                      </div>
                      <Switch id="club-updates" defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security Alerts</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="login-notifications">New Device Login Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive an email when logging in from a new device
                        </p>
                      </div>
                      <Switch id="login-notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="password-change">Password Change Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified when your password is changed</p>
                      </div>
                      <Switch id="password-change" defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Preferences</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-digest">Weekly Email Digest</Label>
                        <p className="text-sm text-muted-foreground">Receive a weekly summary of upcoming events</p>
                      </div>
                      <Switch id="email-digest" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "privacy" && (
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data Settings</CardTitle>
                <CardDescription>Manage your privacy preferences and data controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">RSVP Visibility</h3>

                  <div className="space-y-2">
                    <Label htmlFor="rsvp-visibility">Who can see your RSVPs</Label>
                    <Select defaultValue="friends">
                      <SelectTrigger id="rsvp-visibility">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public (Everyone)</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private (Only You)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      This controls who can see which events you're attending
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Block & Report Users</h3>

                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search users to block..." className="pl-10" />
                    </div>

                    <div className="rounded-md border">
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground text-center">You haven't blocked any users yet</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Report a User
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data & Analytics</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="personalized-recommendations">Personalized Event Recommendations</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow us to suggest events based on your interests and activity
                        </p>
                      </div>
                      <Switch id="personalized-recommendations" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="analytics-tracking">Analytics Tracking for Improved Experience</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow us to collect usage data to improve the platform
                        </p>
                      </div>
                      <Switch id="analytics-tracking" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data-sharing">Allow Data Sharing with Campus Partners</Label>
                        <p className="text-sm text-muted-foreground">
                          Share your data with trusted campus organizations
                        </p>
                      </div>
                      <Switch id="data-sharing" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Export & Deletion</h3>

                  <div className="space-y-4">
                    <Button variant="outline" className="w-full">
                      Request Data Export
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      You'll receive an email with a link to download your data within 48 hours
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Privacy Settings
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "club" && (
            <Card>
              <CardHeader>
                <CardTitle>Club Management Settings</CardTitle>
                <CardDescription>Manage your club profile and event settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Club Profile Settings</h3>

                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Club logo" />
                      <AvatarFallback>TC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Change Club Logo
                      </Button>
                      <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="club-name">Club Name</Label>
                    <Input id="club-name" defaultValue="Tech Club" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="club-description">Club Description</Label>
                    <Input id="club-description" defaultValue="Exploring the latest in technology and innovation" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="club-email">Club Email</Label>
                    <Input id="club-email" defaultValue="techclub@university.edu" readOnly className="bg-muted" />
                  </div>

                  <div className="space-y-2">
                    <Label>Club Categories</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-500">Tech</Badge>
                      <Badge className="bg-purple-500">Workshop</Badge>
                      <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                        + Add Category
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Social Media Links</Label>
                    <div className="space-y-2">
                      <Input placeholder="Instagram URL" defaultValue="https://instagram.com/techclub" />
                      <Input placeholder="Twitter URL" defaultValue="https://twitter.com/techclub" />
                      <Input placeholder="Website URL" defaultValue="https://techclub.university.edu" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Event Promotion Settings</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-promotion">Auto-Promotion of Events</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically feature upcoming events on homepage
                        </p>
                      </div>
                      <Switch id="auto-promotion" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="featured-events">Featured Events on Homepage</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow your events to be featured on the homepage
                        </p>
                      </div>
                      <Switch id="featured-events" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="event-reminders">Event Reminder Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send automatic reminders to attendees</p>
                      </div>
                      <Switch id="event-reminders" defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Analytics Dashboard</h3>

                  <div className="rounded-md border p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Event Attendance</h4>
                        <span className="text-sm text-muted-foreground">Last 30 days</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Cook The Code</span>
                          <span>78/100 attendees</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Web Development Bootcamp</span>
                          <span>35/40 attendees</span>
                        </div>
                        <Progress value={87.5} className="h-2" />
                      </div>

                      <Button variant="outline" className="w-full">
                        View Full Analytics
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Club Members</h3>

                  <div className="rounded-md border">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Member" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">Admin</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <Separator />
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Member" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Jane Smith</p>
                          <p className="text-sm text-muted-foreground">Member</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <Separator />
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Member" />
                          <AvatarFallback>RJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Robert Johnson</p>
                          <p className="text-sm text-muted-foreground">Member</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Invite New Members
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Club Settings
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

