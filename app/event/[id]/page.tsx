"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Share2, MessageSquare, ThumbsUp } from "lucide-react"
import { events } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import QRCode from "@/components/qr-code"

export default function EventPage({ params }: { params: { id: string } }) {
  const [isRSVPed, setIsRSVPed] = useState(false)
  const [showQR, setShowQR] = useState(false)

  // Find the event by ID
  const event = events.find((e) => e.id === params.id) || events[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {event.tags.map((tag) => (
                <Badge
                  key={tag}
                  className={
                    tag === "Tech"
                      ? "bg-blue-500"
                      : tag === "Cultural"
                        ? "bg-purple-500"
                        : tag === "Sports"
                          ? "bg-green-500"
                          : tag === "Workshop"
                            ? "bg-amber-500"
                            : "bg-rose-500"
                  }
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
            <p className="text-muted-foreground mb-6">Organized by {event.clubName}</p>

            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-6">
              <img
                src={event.posterUrl || "/placeholder.svg?height=800&width=1200"}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-muted-foreground">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-muted-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium">Venue</p>
                  <p className="text-muted-foreground">{event.venue}</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="about" className="mb-6">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="attendees">Attendees</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-4">
                <h3 className="text-xl font-bold mb-3">About This Event</h3>
                <p className="text-muted-foreground mb-4">{event.description}</p>

                <h4 className="font-bold mb-2">What to Bring</h4>
                <ul className="list-disc pl-5 mb-4 text-muted-foreground">
                  <li>Laptop and charger</li>
                  <li>Student ID</li>
                  <li>Notebook and pen</li>
                  <li>Water bottle</li>
                </ul>

                <h4 className="font-bold mb-2">Additional Information</h4>
                <p className="text-muted-foreground">
                  Please arrive 15 minutes early for check-in. Refreshments will be provided.
                </p>
              </TabsContent>

              <TabsContent value="discussion" className="mt-4">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea placeholder="Ask a question or leave a comment..." className="mb-2" />
                      <Button>Post</Button>
                    </div>
                  </div>

                  <div className="space-y-4 mt-6">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">Alex Smith</p>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          Will there be any pre-requisites for the workshop? I'm a beginner in programming.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            12
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 ml-12">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>TC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">Tech Club</p>
                          <Badge variant="outline" className="text-xs">
                            Organizer
                          </Badge>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          No pre-requisites needed! This workshop is designed for beginners. Just bring your laptop and
                          enthusiasm!
                        </p>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <ThumbsUp className="h-4 w-4 mr-1" />8
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="attendees" className="mt-4">
                <h3 className="text-xl font-bold mb-3">Attendees</h3>

                {event.capacity && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{event.attendees} people going</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {event.capacity - event.attendees} spots left
                      </span>
                    </div>
                    <Progress value={(event.attendees / event.capacity) * 100} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage src={`/placeholder.svg?height=64&width=64&text=${i + 1}`} />
                        <AvatarFallback>U{i + 1}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium text-sm">User {i + 1}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="photos" className="mt-4">
                <h3 className="text-xl font-bold mb-3">Event Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-md overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=300&width=300&text=Photo${i + 1}`}
                        alt={`Event photo ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="mb-6">
              <CardContent className="pt-6">
                {showQR ? (
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-4">Your Check-in QR Code</h3>
                    <div className="bg-white p-4 rounded-lg inline-block mb-4">
                      <QRCode value={`event-${event.id}-check-in`} size={200} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Present this QR code at the event entrance for quick check-in
                    </p>
                    <Button variant="outline" className="w-full" onClick={() => setShowQR(false)}>
                      Hide QR Code
                    </Button>
                  </div>
                ) : (
                  <>
                    {event.capacity && (
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{event.attendees} attending</span>
                          <span className="text-sm text-muted-foreground">
                            {event.capacity - event.attendees} spots left
                          </span>
                        </div>
                        <Progress value={(event.attendees / event.capacity) * 100} className="h-2" />
                      </div>
                    )}

                    {isRSVPed ? (
                      <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 p-4 rounded-lg text-center">
                          <p className="font-medium">You're attending this event!</p>
                        </div>
                        <Button className="w-full" onClick={() => setShowQR(true)}>
                          View Check-in QR Code
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full text-red-600 hover:text-red-700"
                          onClick={() => setIsRSVPed(false)}
                        >
                          Cancel RSVP
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mb-4"
                        onClick={() => setIsRSVPed(true)}
                      >
                        RSVP Now
                      </Button>
                    )}

                    <div className="flex gap-2 mb-6">
                      <Button variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Add to Calendar
                      </Button>
                    </div>
                  </>
                )}

                <div className="pt-4 border-t">
                  <h3 className="font-bold mb-3">Organized by</h3>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>TC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{event.clubName}</p>
                      <p className="text-sm text-muted-foreground">Event Organizer</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-3">Similar Events</h3>
                <div className="space-y-4">
                  {events
                    .slice(0, 3)
                    .filter((e) => e.id !== event.id)
                    .map((similarEvent) => (
                      <div key={similarEvent.id} className="flex gap-3">
                        <img
                          src={similarEvent.posterUrl || "/placeholder.svg"}
                          alt={similarEvent.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium line-clamp-1">{similarEvent.name}</p>
                          <p className="text-xs text-muted-foreground mb-1">{similarEvent.date}</p>
                          <Badge variant="secondary" className="text-xs">
                            {similarEvent.tags[0]}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

