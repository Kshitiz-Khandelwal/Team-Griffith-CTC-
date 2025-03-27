"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Bookmark, BookmarkCheck, Share2, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Event } from "@/lib/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.posterUrl || "/placeholder.svg"}
          alt={event.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isBookmarked ? "Remove from saved" : "Save event"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share event</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {event.capacity && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-black/70 text-white backdrop-blur-sm">
              <Users className="h-3 w-3 mr-1" />
              {event.attendees}/{event.capacity} spots
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {event.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={cn(
                "text-xs",
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

        <h3 className="text-xl font-bold mb-1 line-clamp-1">{event.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">by {event.clubName}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.venue}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-3">
        <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          RSVP Now
        </Button>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

