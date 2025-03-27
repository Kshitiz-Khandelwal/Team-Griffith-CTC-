"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Bookmark, BookmarkCheck, Users, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Event } from "@/lib/types"
import { Progress } from "@/components/ui/progress"

interface FeaturedEventProps {
  event: Event
}

export default function FeaturedEvent({ event }: FeaturedEventProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-xl overflow-hidden border shadow-sm">
      <div className="lg:col-span-1 h-64 lg:h-auto relative">
        <img
          src={event.posterUrl || "/placeholder.svg?height=600&width=400"}
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="lg:col-span-2 p-6 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {event.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={cn(
                tag === "Tech" && "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
                tag === "Cultural" && "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
                tag === "Sports" && "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
                tag === "Workshop" && "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
                tag === "Competition" && "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300",
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">Organized by {event.clubName}</p>

        <p className="mb-4 text-muted-foreground">{event.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Date</p>
              <p className="text-sm text-muted-foreground">{event.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Time</p>
              <p className="text-sm text-muted-foreground">{event.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Venue</p>
              <p className="text-sm text-muted-foreground">{event.venue}</p>
            </div>
          </div>
        </div>

        {event.capacity && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{event.attendees} people going</span>
              </div>
              <span className="text-sm text-muted-foreground">{event.capacity - event.attendees} spots left</span>
            </div>
            <Progress value={(event.attendees / event.capacity) * 100} className="h-2" />
          </div>
        )}

        <div className="flex gap-3 mt-auto">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            RSVP Now
          </Button>
          <Button variant="outline" size="icon" onClick={() => setIsBookmarked(!isBookmarked)}>
            {isBookmarked ? <BookmarkCheck className="h-5 w-5 text-blue-600" /> : <Bookmark className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

