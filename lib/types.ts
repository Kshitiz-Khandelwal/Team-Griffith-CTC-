export interface Event {
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
}

