"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { QrCode, MoreHorizontal, Star, History, Calendar, Clock, MapPin, Download, ExternalLink } from "lucide-react"
import { events } from "@/lib/data"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import QRCode from "@/components/qr-code"

export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [showQRCode, setShowQRCode] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

  const handleViewQRCode = (eventId: string) => {
    setSelectedEventId(eventId)
    setShowQRCode(true)
  }

  const selectedEvent = events.find((event) => event.id === selectedEventId) || events[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Events</h1>
      <p className="text-muted-foreground mb-8">Manage your registered, bookmarked, and past events</p>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="space-y-6">
            {events.slice(0, 3).map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-40 md:h-auto">
                    <img
                      src={event.posterUrl || "/placeholder.svg?height=200&width=200"}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {event.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className={
                            tag === "Tech"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                              : tag === "Cultural"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
                                : tag === "Sports"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                  : tag === "Workshop"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                                    : "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300"
                          }
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold mb-1">{event.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">by {event.clubName}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                        >
                          RSVP Confirmed
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                        >
                          Check-in Required
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewQRCode(event.id)}>
                          <QrCode className="h-4 w-4 mr-2" />
                          Check-in QR
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Event Details</DropdownMenuItem>
                            <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                            <DropdownMenuItem>Share Event</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Cancel RSVP</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarked" className="mt-6">
          <div className="space-y-6">
            {events.slice(2, 5).map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-40 md:h-auto">
                    <img
                      src={event.posterUrl || "/placeholder.svg?height=200&width=200"}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {event.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className={
                            tag === "Tech"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                              : tag === "Cultural"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
                                : tag === "Sports"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                  : tag === "Workshop"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                                    : "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300"
                          }
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold mb-1">{event.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">by {event.clubName}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
                        >
                          Bookmarked
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-2 fill-current" />
                          Saved
                        </Button>
                        <Button size="sm">RSVP Now</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Event Details</DropdownMenuItem>
                            <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                            <DropdownMenuItem>Share Event</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Remove Bookmark</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="space-y-6">
            {events.slice(3, 6).map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-40 md:h-auto">
                    <img
                      src={event.posterUrl || "/placeholder.svg?height=200&width=200"}
                      alt={event.name}
                      className="w-full h-full object-cover opacity-70"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {event.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className={
                            tag === "Tech"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                              : tag === "Cultural"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
                                : tag === "Sports"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                  : tag === "Workshop"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                                    : "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300"
                          }
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold mb-1">{event.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">by {event.clubName}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800"
                        >
                          Attended
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                        >
                          Check-in Verified
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Materials
                        </Button>
                        <Button variant="outline" size="sm">
                          <History className="h-4 w-4 mr-2" />
                          View Photos
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Event Details</DropdownMenuItem>
                            <DropdownMenuItem>Download Certificate</DropdownMenuItem>
                            <DropdownMenuItem>Share Feedback</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Event Reminder Settings</CardTitle>
          <CardDescription>Customize how you receive notifications for your events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-reminders">Email Reminders</Label>
                <p className="text-sm text-muted-foreground">Receive event reminders via email</p>
              </div>
              <Switch id="email-reminders" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
              </div>
              <Switch id="push-notifications" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reminder-timing">Reminder Timing</Label>
                <p className="text-sm text-muted-foreground">When to send event reminders</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>1 day before</Badge>
                <Badge>1 hour before</Badge>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>

      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Event Check-in QR Code</DialogTitle>
            <DialogDescription>Present this QR code at the event entrance for quick check-in</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg mb-4">
              <QRCode value={`event-${selectedEventId}-checkin`} size={200} />
            </div>
            <div className="text-center">
              <h3 className="font-medium">{selectedEvent.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedEvent.date} • {selectedEvent.time}
              </p>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="sm:w-auto w-full" onClick={() => setShowQRCode(false)}>
              Close
            </Button>
            <Button className="sm:w-auto w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              Add to Wallet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

