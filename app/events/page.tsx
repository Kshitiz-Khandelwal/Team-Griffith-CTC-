"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Search, ListFilter, Grid3X3, SlidersHorizontal, Tag, Sparkles, Percent } from "lucide-react"
import EventCard from "@/components/event-card"
import { events } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Enhanced event type with match score and matched tags
interface EnhancedEvent {
  id: string
  name: string
  clubName: string
  description: string
  date: string
  time: string
  venue: string
  posterUrl: string
  tags: string[]
  capacity?: number
  attendees?: number
  matchScore: number
  matchedTags: string[]
}

// Sample user interests
const userInterests = ["Tech", "AI/ML", "Web Development", "Hackathon", "Entrepreneurship", "Data Science"]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [matchThreshold, setMatchThreshold] = useState(30) // Minimum match percentage to show
  const [sortBy, setSortBy] = useState<"match" | "date" | "popularity">("match")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [enhancedEvents, setEnhancedEvents] = useState<EnhancedEvent[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Calculate match scores for events based on user interests
  useEffect(() => {
    const enhanced = events.map((event) => {
      // Calculate how many tags match user interests
      const matchedTags = event.tags.filter(
        (tag) =>
          userInterests.includes(tag) ||
          // Also match similar tags (simplified for demo)
          (tag === "Competition" && userInterests.includes("Hackathon")) ||
          (tag === "Workshop" && userInterests.includes("Web Development")),
      )

      // Calculate match score (0-100)
      const matchScore = Math.min(100, Math.round((matchedTags.length / Math.max(1, userInterests.length)) * 100))

      return {
        ...event,
        matchScore,
        matchedTags,
      }
    })

    setEnhancedEvents(enhanced)
  }, [])

  // Filter events based on search query, categories, and match threshold
  const filteredEvents = enhancedEvents.filter(
    (event) =>
      // Match threshold filter
      event.matchScore >= matchThreshold &&
      // Search query filter
      (searchQuery === "" ||
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      // Categories filter
      (selectedCategories.length === 0 || event.tags.some((tag) => selectedCategories.includes(tag))),
  )

  // Sort events based on selected sort method
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "match") {
      return b.matchScore - a.matchScore
    } else if (sortBy === "date") {
      // Simple date comparison for demo
      return a.date.localeCompare(b.date)
    } else {
      // Sort by popularity (attendees)
      return (b.attendees || 0) - (a.attendees || 0)
    }
  })

  // All unique categories from events
  const allCategories = Array.from(new Set(events.flatMap((event) => event.tags))).sort()

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setMatchThreshold(30)
    setSelectedCategories([])
    setSortBy("match")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  Events
</h1>

          <p className="text-muted-foreground">Discover events matched to your interests</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar View
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <ListFilter className="h-4 w-4" />
            List View
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Grid View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Mobile filter button */}
        <div className="lg:hidden w-full mb-4">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters & Sorting
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters & Sorting</SheetTitle>
                <SheetDescription>Customize your event discovery experience</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Match Threshold</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>All Events</span>
                      <span>Perfect Match</span>
                    </div>
                    <Slider
                      value={[matchThreshold]}
                      min={0}
                      max={100}
                      step={10}
                      onValueChange={(value) => setMatchThreshold(value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Only show events with at least {matchThreshold}% match to your interests
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sort By</h3>
                  <Select value={sortBy} onValueChange={(value: "match" | "date" | "popularity") => setSortBy(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Best Match</SelectItem>
                      <SelectItem value="date">Date (Upcoming)</SelectItem>
                      <SelectItem value="popularity">Popularity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {allCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label htmlFor={`mobile-${category}`} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" onClick={clearFilters}>
                    Reset Filters
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop sidebar filters */}
        <div className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              Interest Matching
            </h3>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Match Threshold</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>All Events</span>
                  <span>Perfect Match</span>
                </div>
                <Slider
                  value={[matchThreshold]}
                  min={0}
                  max={100}
                  step={10}
                  onValueChange={(value) => setMatchThreshold(value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Only show events with at least {matchThreshold}% match to your interests
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Sort By</h4>
              <Select value={sortBy} onValueChange={(value: "match" | "date" | "popularity") => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="date">Date (Upcoming)</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Your Interests</h4>
              <div className="flex flex-wrap gap-2">
                {userInterests.map((interest) => (
                  <Badge key={interest} className="bg-blue-600">
                    {interest}
                  </Badge>
                ))}
              </div>
              <Button
                variant="link"
                className="text-xs p-0 h-auto"
                onClick={() => (window.location.href = "/interests")}
              >
                Edit Interests
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Categories</h4>
              <div className="space-y-1 max-h-[200px] overflow-y-auto pr-2">
                {allCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full" onClick={clearFilters}>
              Reset Filters
            </Button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="best-match">Best Match</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {sortedEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sortedEvents.map((event) => (
                    <div key={event.id} className="relative">
                      {event.matchScore > 0 && (
                        <div className="absolute top-3 right-3 z-10">
                          <Badge
                            className={`
                            ${
                              event.matchScore >= 80
                                ? "bg-green-600"
                                : event.matchScore >= 50
                                  ? "bg-yellow-600"
                                  : "bg-blue-600"
                            }
                            flex items-center gap-1
                          `}
                          >
                            <Percent className="h-3 w-3" />
                            {event.matchScore}% Match
                          </Badge>
                        </div>
                      )}
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No matching events found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your filters or interests</p>
                  <Button onClick={clearFilters}>Reset Filters</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="best-match" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedEvents
                  .filter((event) => event.matchScore >= 70)
                  .map((event) => (
                    <div key={event.id} className="relative">
                      <div className="absolute top-3 right-3 z-10">
                        <Badge
                          className={`
                          ${event.matchScore >= 80 ? "bg-green-600" : "bg-yellow-600"}
                          flex items-center gap-1
                        `}
                        >
                          <Percent className="h-3 w-3" />
                          {event.matchScore}% Match
                        </Badge>
                      </div>
                      <EventCard event={event} />
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="today" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="relative">
                    {event.matchScore > 0 && (
                      <div className="absolute top-3 right-3 z-10">
                        <Badge
                          className={`
                          ${
                            event.matchScore >= 80
                              ? "bg-green-600"
                              : event.matchScore >= 50
                                ? "bg-yellow-600"
                                : "bg-blue-600"
                          }
                          flex items-center gap-1
                        `}
                        >
                          <Percent className="h-3 w-3" />
                          {event.matchScore}% Match
                        </Badge>
                      </div>
                    )}
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedEvents.slice(2, 6).map((event) => (
                  <div key={event.id} className="relative">
                    {event.matchScore > 0 && (
                      <div className="absolute top-3 right-3 z-10">
                        <Badge
                          className={`
                          ${
                            event.matchScore >= 80
                              ? "bg-green-600"
                              : event.matchScore >= 50
                                ? "bg-yellow-600"
                                : "bg-blue-600"
                          }
                          flex items-center gap-1
                        `}
                        >
                          <Percent className="h-3 w-3" />
                          {event.matchScore}% Match
                        </Badge>
                      </div>
                    )}
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

