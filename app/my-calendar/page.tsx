"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { events } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"

export default function MyCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Calendar</h1>

      <Tabs defaultValue="calendar" className="mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-6">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>{date ? format(date, "MMMM yyyy") : "Calendar"}</CardTitle>
                  <CardDescription>Your upcoming events</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setView("month")}>
                    Month
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setView("week")}>
                    Week
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setView("day")}>
                    Day
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="font-medium">
                    {view === "month" && (date ? format(date, "MMMM yyyy") : "")}
                    {view === "week" && (date ? `Week of ${format(date, "MMM d, yyyy")}` : "")}
                    {view === "day" && (date ? format(date, "EEEE, MMMM d, yyyy") : "")}
                  </div>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Tech Events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Cultural Events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Sports Events</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's Events</CardTitle>
                <CardDescription>{format(new Date(), "MMMM d, yyyy")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="min-w-12 text-center">
                        <div className="text-2xl font-bold">{new Date().getDate()}</div>
                        <div className="text-xs text-muted-foreground">{format(new Date(), "MMM").toUpperCase()}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{event.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">by {event.clubName}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
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
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span>{event.venue}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View QR
                        </Button>
                        <Button size="sm">Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Events</CardTitle>
              <CardDescription>All your upcoming and past events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Upcoming Events</h3>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="min-w-12 text-center">
                          <div className="text-2xl font-bold">24</div>
                          <div className="text-xs text-muted-foreground">MAR</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{event.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">by {event.clubName}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
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
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span>{event.venue}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                          <Button size="sm">View QR</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Past Events</h3>
                  <div className="space-y-4">
                    {events.slice(0, 2).map((event) => (
                      <div key={`past-${event.id}`} className="flex items-start gap-4 p-4 border rounded-lg opacity-70">
                        <div className="min-w-12 text-center">
                          <div className="text-2xl font-bold">10</div>
                          <div className="text-xs text-muted-foreground">MAR</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{event.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">by {event.clubName}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
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
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span>{event.venue}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Rate
                          </Button>
                          <Button size="sm">View Photos</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

