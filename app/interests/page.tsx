"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, X, Save, Tag, Sparkles, Clock, ThumbsUp, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

// Sample interest categories and tags
const interestCategories = [
  {
    id: "academic",
    name: "Academic",
    tags: [
      "Computer Science",
      "Engineering",
      "Mathematics",
      "Physics",
      "Biology",
      "Chemistry",
      "Literature",
      "History",
      "Economics",
      "Psychology",
    ],
  },
  {
    id: "tech",
    name: "Technology",
    tags: [
      "AI/ML",
      "Web Development",
      "Mobile Apps",
      "Blockchain",
      "Cybersecurity",
      "Data Science",
      "IoT",
      "Cloud Computing",
      "Game Development",
      "Robotics",
    ],
  },
  {
    id: "arts",
    name: "Arts & Culture",
    tags: [
      "Music",
      "Dance",
      "Painting",
      "Photography",
      "Theater",
      "Film",
      "Creative Writing",
      "Sculpture",
      "Design",
      "Fashion",
    ],
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    tags: [
      "Basketball",
      "Football",
      "Cricket",
      "Tennis",
      "Swimming",
      "Yoga",
      "Running",
      "Cycling",
      "Martial Arts",
      "Fitness",
    ],
  },
  {
    id: "social",
    name: "Social & Community",
    tags: [
      "Volunteering",
      "Leadership",
      "Public Speaking",
      "Debate",
      "Environmental",
      "Social Justice",
      "Cultural Exchange",
      "Mentoring",
      "Networking",
      "Community Service",
    ],
  },
  {
    id: "career",
    name: "Career & Professional",
    tags: [
      "Entrepreneurship",
      "Internships",
      "Resume Building",
      "Interview Skills",
      "Career Fair",
      "Industry Talks",
      "Workshops",
      "Certifications",
      "Networking Events",
      "Professional Development",
    ],
  },
]

export default function InterestsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [customInterests, setCustomInterests] = useState<string[]>([])
  const [newCustomInterest, setNewCustomInterest] = useState("")
  const [matchingPreference, setMatchingPreference] = useState(70) // 0-100 scale for interest matching strictness
  const [autoDiscoveryEnabled, setAutoDiscoveryEnabled] = useState(true)
  const [socialMatchingEnabled, setSocialMatchingEnabled] = useState(true)

  // Simulated recommended interests based on user profile and activity
  const recommendedInterests = ["AI/ML", "Web Development", "Hackathon", "Entrepreneurship", "Data Science"]

  // Filter categories and tags based on search query
  const filteredCategories = interestCategories
    .map((category) => ({
      ...category,
      tags: category.tags.filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((category) => category.tags.length > 0)

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const handleAddCustomInterest = () => {
    if (newCustomInterest.trim() && !customInterests.includes(newCustomInterest.trim())) {
      setCustomInterests([...customInterests, newCustomInterest.trim()])
      setSelectedInterests([...selectedInterests, newCustomInterest.trim()])
      setNewCustomInterest("")
    }
  }

  const handleRemoveCustomInterest = (interest: string) => {
    setCustomInterests(customInterests.filter((i) => i !== interest))
    setSelectedInterests(selectedInterests.filter((i) => i !== interest))
  }

  const handleSaveInterests = () => {
    // In a real app, this would save to the backend
    toast({
      title: "Interests saved successfully",
      description: "Your interest preferences have been updated.",
      action: (
        <ToastAction altText="View matched events" onClick={() => router.push("/events")}>
          View matched events
        </ToastAction>
      ),
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Interest Preferences</h1>
          <p className="text-muted-foreground">Customize your interests to get personalized event recommendations</p>
        </div>
        <Button
          onClick={handleSaveInterests}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Preferences
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Interests</CardTitle>
              <CardDescription>
                Select interests to help us recommend events that match your preferences
              </CardDescription>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search interests..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Categories</TabsTrigger>
                  <TabsTrigger value="selected">Selected ({selectedInterests.length})</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-6">
                      {filteredCategories.map((category) => (
                        <div key={category.id} className="space-y-3">
                          <h3 className="font-medium">{category.name}</h3>
                          <div className="flex flex-wrap gap-2">
                            {category.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant={selectedInterests.includes(tag) ? "default" : "outline"}
                                className={
                                  selectedInterests.includes(tag)
                                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                    : "hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
                                }
                                onClick={() => handleInterestToggle(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Separator />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="selected" className="mt-6">
                  {selectedInterests.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedInterests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="default"
                          className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                          onClick={() => handleInterestToggle(interest)}
                        >
                          {interest}
                          <X className="ml-1 h-3 w-3" />
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No interests selected</h3>
                      <p className="text-muted-foreground mb-4">
                        Select interests from the categories to get personalized event recommendations
                      </p>
                      <Button variant="outline" onClick={() => document.querySelector('[data-value="all"]')?.click()}>
                        Browse Categories
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="recommended" className="mt-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium mb-1">AI-Powered Recommendations</h3>
                          <p className="text-sm text-muted-foreground">
                            These interests are recommended based on your profile, past events, and similar users
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {recommendedInterests.map((interest) => (
                        <Badge
                          key={interest}
                          variant={selectedInterests.includes(interest) ? "default" : "outline"}
                          className={
                            selectedInterests.includes(interest)
                              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                              : "hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
                          }
                          onClick={() => handleInterestToggle(interest)}
                        >
                          {interest}
                          {selectedInterests.includes(interest) && <ThumbsUp className="ml-1 h-3 w-3" />}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add custom interest..."
                        value={newCustomInterest}
                        onChange={(e) => setNewCustomInterest(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAddCustomInterest()
                          }
                        }}
                      />
                      <Button onClick={handleAddCustomInterest}>
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    </div>

                    {customInterests.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {customInterests.map((interest) => (
                          <Badge
                            key={interest}
                            variant="default"
                            className="bg-purple-600 hover:bg-purple-700 cursor-pointer"
                          >
                            {interest}
                            <X
                              className="ml-1 h-3 w-3"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRemoveCustomInterest(interest)
                              }}
                            />
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">
                          Add custom interests that aren't in our predefined categories
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interest Matching Preview</CardTitle>
              <CardDescription>See how your selected interests match with upcoming events</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedInterests.length > 0 ? (
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Annual Hackathon 2024</h3>
                        <Badge className="bg-green-600">95% Match</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {["Tech", "Hackathon", "AI/ML", "Web Development", "Coding"].map((tag) => (
                          <Badge
                            key={tag}
                            variant={selectedInterests.includes(tag) ? "default" : "secondary"}
                            className={selectedInterests.includes(tag) ? "bg-blue-600" : ""}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Progress value={95} className="h-1.5 mb-2" />
                      <p className="text-sm text-muted-foreground">5 of your interests match this event</p>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Web Development Bootcamp</h3>
                        <Badge className="bg-green-600">80% Match</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {["Tech", "Web Development", "Coding", "Workshop", "JavaScript"].map((tag) => (
                          <Badge
                            key={tag}
                            variant={selectedInterests.includes(tag) ? "default" : "secondary"}
                            className={selectedInterests.includes(tag) ? "bg-blue-600" : ""}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Progress value={80} className="h-1.5 mb-2" />
                      <p className="text-sm text-muted-foreground">3 of your interests match this event</p>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Entrepreneurship Summit</h3>
                        <Badge className="bg-yellow-600">60% Match</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {["Entrepreneurship", "Networking", "Business", "Workshop", "Career"].map((tag) => (
                          <Badge
                            key={tag}
                            variant={selectedInterests.includes(tag) ? "default" : "secondary"}
                            className={selectedInterests.includes(tag) ? "bg-blue-600" : ""}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Progress value={60} className="h-1.5 mb-2" />
                      <p className="text-sm text-muted-foreground">2 of your interests match this event</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" onClick={() => router.push("/events")}>
                    View All Matched Events
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No interests selected yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Select interests to see how they match with upcoming events
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Matching Preferences</CardTitle>
              <CardDescription>Customize how we match events to your interests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Interest Matching Strictness</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Diverse</span>
                    <span>Strict</span>
                  </div>
                  <Slider
                    value={[matchingPreference]}
                    min={0}
                    max={100}
                    step={10}
                    onValueChange={(value) => setMatchingPreference(value[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    {matchingPreference < 30
                      ? "Show a wide variety of events with some relation to my interests"
                      : matchingPreference < 70
                        ? "Balance between variety and relevance to my interests"
                        : "Only show events that closely match my specific interests"}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-discovery">Auto-Discovery</Label>
                    <p className="text-sm text-muted-foreground">Discover new interests based on your activity</p>
                  </div>
                  <Switch
                    id="auto-discovery"
                    checked={autoDiscoveryEnabled}
                    onCheckedChange={setAutoDiscoveryEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="social-matching">Social Matching</Label>
                    <p className="text-sm text-muted-foreground">Recommend events based on friends' interests</p>
                  </div>
                  <Switch
                    id="social-matching"
                    checked={socialMatchingEnabled}
                    onCheckedChange={setSocialMatchingEnabled}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Interest Stats</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Technology</span>
                      <span className="text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Academic</span>
                      <span className="text-muted-foreground">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Career</span>
                      <span className="text-muted-foreground">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Distribution of your selected interests across categories
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How Interest Matching Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-2 mt-0.5">
                  <Tag className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Smart Tagging</h3>
                  <p className="text-sm text-muted-foreground">
                    Events are automatically tagged based on descriptions, organizers, and attendee interests
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/50 rounded-full p-2 mt-0.5">
                  <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">AI-Powered Matching</h3>
                  <p className="text-sm text-muted-foreground">
                    Our algorithm learns from your preferences and past RSVPs to improve recommendations
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-2 mt-0.5">
                  <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Social Connections</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover events that friends with similar interests are attending
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

