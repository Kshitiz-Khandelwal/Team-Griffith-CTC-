"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X, Upload, Image, Link2, Instagram, Twitter } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function CreateEventPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [posterPreview, setPosterPreview] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("details")
  const [eventData, setEventData] = useState({
    instagramLink: "",
    twitterLink: "",
    otherLink: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setEventData((prev) => ({ ...prev, [id]: value }))
  }

  const availableTags = ["Tech", "Cultural", "Sports", "Workshop", "Competition", "Seminar", "Conference"]

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPosterPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleContinue = (nextTab: string) => {
    setActiveTab(nextTab)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create Event</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Fill in the basic information about your event. Once completed, you can upload the data to Firebase.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="event-name">Event Name</Label>
                <Input id="event-name" placeholder="Enter event name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea id="event-description" placeholder="Describe your event" className="min-h-32" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Input id="event-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-time">Time</Label>
                  <Input id="event-time" type="time" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-venue">Venue</Label>
                <Input id="event-venue" placeholder="Enter venue" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-club">Organizing Club</Label>
                <Select>
                  <SelectTrigger id="event-club">
                    <SelectValue placeholder="Select club" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech-club">Tech Club</SelectItem>
                    <SelectItem value="cultural-club">Cultural Club</SelectItem>
                    <SelectItem value="sports-club">Sports Club</SelectItem>
                    <SelectItem value="debate-club">Debate Club</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {availableTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={
                        selectedTags.includes(tag)
                          ? tag === "Tech"
                            ? "bg-blue-500"
                            : tag === "Cultural"
                              ? "bg-purple-500"
                              : tag === "Sports"
                                ? "bg-green-500"
                                : tag === "Workshop"
                                  ? "bg-amber-500"
                                  : tag === "Competition"
                                    ? "bg-rose-500"
                                    : ""
                          : "cursor-pointer"
                      }
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={() => handleContinue("media")}>Continue to Media</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Media</CardTitle>
              <CardDescription>Upload images and media for your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="event-poster">Event Poster</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  {posterPreview ? (
                    <div className="relative">
                      <img
                        src={posterPreview || "/placeholder.svg"}
                        alt="Event poster preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => setPosterPreview(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4 text-muted-foreground">
                        <Upload className="h-8 w-8 mx-auto mb-2" />
                        Drag and drop your poster image here or click to browse
                      </div>
                      <Input
                        id="event-poster"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePosterUpload}
                      />
                      <Button asChild>
                        <label htmlFor="event-poster">Upload Poster</label>
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-gallery">Additional Images (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <div className="mb-4 text-muted-foreground">
                    <Image className="h-8 w-8 mx-auto mb-2" />
                    Upload additional images for your event gallery
                  </div>
                  <Button>Upload Images</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Social Media Links</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5 text-pink-500" />
                  <Input
                    id="instagramLink"
                    placeholder="Instagram link (optional)"
                    value={eventData.instagramLink}
                    onChange={handleInputChange}
                  />
                  </div>
                  <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-blue-400" />
                  <Input
                    id="twitterLink"
                    placeholder="Twitter link (optional)"
                    value={eventData.twitterLink}
                    onChange={handleInputChange}
                  />
                  </div>
                  <div className="flex items-center gap-3">
                  <Link2 className="h-5 w-5 text-gray-500" />
                  <Input
                    id="otherLink"
                    placeholder="Other link (optional)"
                    value={eventData.otherLink}
                    onChange={handleInputChange}
                  />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleContinue("details")}>
                Back to Details
              </Button>
              <Button onClick={() => handleContinue("settings")}>Continue to Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Settings</CardTitle>
              <CardDescription>Configure additional settings for your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="event-capacity">Maximum Capacity</Label>
                <Input id="event-capacity" type="number" placeholder="Enter maximum attendees" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-registration-deadline">Registration Deadline</Label>
                <Input id="event-registration-deadline" type="datetime-local" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="event-public">Make event public</Label>
                  <p className="text-sm text-muted-foreground">
                    Public events will be visible to all users on the platform
                  </p>
                </div>
                <Switch id="event-public" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="event-rsvp">Require RSVP</Label>
                  <p className="text-sm text-muted-foreground">Users will need to RSVP to attend this event</p>
                </div>
                <Switch id="event-rsvp" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="event-notifications">Send notifications</Label>
                  <p className="text-sm text-muted-foreground">Attendees will receive notifications about this event</p>
                </div>
                <Switch id="event-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="event-qr">Generate QR code for check-in</Label>
                  <p className="text-sm text-muted-foreground">Create a QR code for easy event check-in</p>
                </div>
                <Switch id="event-qr" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="event-feedback">Enable post-event feedback</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow attendees to rate and review the event after attending
                  </p>
                </div>
                <Switch id="event-feedback" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleContinue("media")}>
                Back to Media
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Publish Event
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

