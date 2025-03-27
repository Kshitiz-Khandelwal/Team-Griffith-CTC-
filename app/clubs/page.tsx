import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClubsPage() {
  const clubs = [
    {
      id: 1,
      name: "IEEE",
      description: "Exploring the latest in technology and innovation",
      members: 120,
      events: 100,
      image: "/images/11.jpg?height=100&width=100",
      categories: ["Tech", "Workshop", "Hackathon", "Learning"],
    },
    {
      id: 2,
      name: "Tandav",
      description: "Express Yourself Through Movement!",
      members: 85,
      events: 50,
      image: "/images/112.jpg?height=100&width=100",
      categories: ["Cultural", "Performance"],
    },
    {
      id: 3,
      name: "Rotoract",
      description: "Service Above Self ",
      members: 150,
      events: 20,
      image: "/images/113.jpg?height=100&width=100",
      categories: ["Community", "Self Improvement", "Adventure"],
    },
    {
      id: 4,
      name: "Coding Club",
      description: "Fostering critical thinking and public speaking",
      members: 65,
      events: 8,
      image: "/images/114.jpg?height=100&width=100",
      categories: ["Innovation", "Competition", "Hackathon"],
    },
    {
      id: 5,
      name: "Aero Club",
      description: "Aero Club is dedicated to aviation and aeromodelling, where enthusiasts design, build, and fly drones, planes, and UAVs.",
      members: 45,
      events: 6,
      image: "/images/115.jpg?height=100&width=100",
      categories: ["Innovation", "Aerospace", "Drones"],
    },
    {
      id: 6,
      name: "IIC BICEP",
      description: "Building the next generation of business leaders",
      members: 70,
      events: 10,
      image: "/images/116.jpg?height=100&width=100",
      categories: ["Business", "Workshop", "Seminar"],
    },
    {
      id: 7,
      name: "Music Club",
      description: "Exploring the world of music and performance",
      members: 50,
      events: 35,
      image: "/images/117.jpg?height=100&width=100",
      categories: ["Cultural", "Performance"],
    },
    {
      id: 8,
      name: "Environmental Club",
      description: "Promoting sustainability and environmental awareness",
      members: 40,
      events: 7,
      image: "/placeholder.svg?height=100&width=100",
      categories: ["Environment", "Volunteer"],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Campus Clubs</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clubs..." className="pl-10 w-full" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Badge className="bg-blue-500 hover:bg-blue-600 cursor-pointer">Tech</Badge>
        <Badge className="bg-purple-500 hover:bg-purple-600 cursor-pointer">Cultural</Badge>
        <Badge className="bg-green-500 hover:bg-green-600 cursor-pointer">Sports</Badge>
        <Badge className="bg-amber-500 hover:bg-amber-600 cursor-pointer">Arts</Badge>
        <Badge className="bg-rose-500 hover:bg-rose-600 cursor-pointer">Business</Badge>
        <Badge className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">Environment</Badge>
        <Badge variant="outline">View All</Badge>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Clubs</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="my">My Clubs</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clubs.map((club) => (
              <Card key={club.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={club.image || "/placeholder.svg"}
                      alt={club.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-xl">{club.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {club.members} members • {club.events} events
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{club.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {club.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clubs.slice(0, 4).map((club) => (
              <Card key={club.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={club.image || "/placeholder.svg"}
                      alt={club.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-xl">{club.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {club.members} members • {club.events} events
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{club.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {club.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clubs.slice(4, 8).map((club) => (
              <Card key={club.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={club.image || "/placeholder.svg"}
                      alt={club.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-xl">{club.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {club.members} members • {club.events} events
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{club.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {club.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">You haven't joined any clubs yet</h3>
            <p className="text-muted-foreground mb-6">Join clubs to see their events and updates</p>
            <Button>Browse Clubs</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

