import { Button } from "@/components/ui/button"
import EventCard from "@/components/event-card"
import { Search, Filter, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { events } from "@/lib/data"
import FeaturedEvent from "@/components/featured-event"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        Stay Connected with Campus Happenings
        </h1>
        <p className="text-muted-foreground text-lg mb-6">From tech workshops to cultural fests, find events that matter to you!</p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search events..." className="pl-10 w-full" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Badge className="bg-blue-500 hover:bg-blue-600">Hackathon</Badge>
          <Badge className="bg-purple-500 hover:bg-purple-600">Cultural</Badge>
          <Badge className="bg-green-500 hover:bg-green-600">Sports</Badge>
          <Badge className="bg-amber-500 hover:bg-amber-600">Career & Internship</Badge>
          <Badge className="bg-rose-500 hover:bg-rose-600">Networking</Badge>
          <Badge variant="outline">View All</Badge>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Event</h2>
        <FeaturedEvent event={events[0]} />
      </section>

      <section className="mb-12">
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
            <Button variant="ghost" className="text-blue-600">
              View All
            </Button>
          </div>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="today">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.slice(2, 5).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Announcements</h2>
          <Button variant="ghost" className="text-blue-600">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-xl border border-blue-100 dark:border-blue-900">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-600">Important</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Campus-Wide Hackathon Registration Open</h3>
            <p className="text-muted-foreground mb-4">
              Registration for the annual campus-wide hackathon is now open. Don't miss your chance to participate!
            </p>
            <Button variant="outline" className="text-blue-600 border-blue-200 dark:border-blue-800">
              Learn More
            </Button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-xl border border-purple-100 dark:border-purple-900">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-600">New</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Cultural Festival Volunteers Needed</h3>
            <p className="text-muted-foreground mb-4">
              The annual cultural festival is looking for volunteers. Sign up today to help make this event a success!
            </p>
            <Button variant="outline" className="text-purple-600 border-purple-200 dark:border-purple-800">
              Sign Up
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Clubs</h2>
          <Button variant="ghost" className="text-blue-600">
            View All Clubs
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "IEEE", members: 120, events: 15, image: "/images/11.jpg?height=80&width=80" },
            { name: "IIC-BICEP", members: 85, events: 12, image: "/images/12.jpg?height=80&width=80" },
            { name: "Aero Club", members: 150, events: 20, image: "/images/13.jpeg?height=80&width=80" },
            { name: "Rushang", members: 65, events: 8, image: "/images/14.jpg?height=80&width=80" },
          ].map((club, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 border rounded-xl text-center hover:shadow-md transition-shadow"
            >
              <img src={club.image || "/placeholder.svg"} alt={club.name} className="w-20 h-20 rounded-full mb-4" />
              <h3 className="font-bold mb-1">{club.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {club.members} members • {club.events} events
              </p>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

