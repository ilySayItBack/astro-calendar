"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getAllAstroEvents, sampleBirthChart } from "@/lib/astro"

interface AstroCalendarProps {
  month: number
  year: number
  birthChart?: typeof sampleBirthChart
}

export function AstroCalendar({ month, year, birthChart = sampleBirthChart }: AstroCalendarProps) {
  // Get astrological events for the month
  const astroEvents = getAllAstroEvents(birthChart, year, month)

  // Get days in month and first day of month
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  // Create calendar days array
  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null) // Empty cells for days before the 1st of the month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  // State for selected day
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    return astroEvents.filter((event) => event.date.getDate() === day)
  }

  // Get event type color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "moon":
        return "bg-purple-500"
      case "planet":
        return "bg-blue-500"
      case "transit":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2 text-sm font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const events = day ? getEventsForDay(day) : []
          const hasEvents = events.length > 0
          const isSelected = day === selectedDay

          return (
            <div
              key={index}
              className={cn(
                "aspect-square p-1 relative",
                day ? "cursor-pointer hover:bg-muted/50" : "",
                isSelected ? "bg-muted" : "",
              )}
              onClick={() => day && setSelectedDay(isSelected ? null : day)}
            >
              {day ? (
                <>
                  <div className="h-full w-full p-1">
                    <div className="flex justify-between items-start h-full">
                      <span className="text-sm">{day}</span>
                      {hasEvents && (
                        <div className="flex flex-wrap gap-0.5 justify-end">
                          {events.slice(0, 2).map((event, i) => (
                            <div
                              key={i}
                              className={cn("h-2 w-2 rounded-full", getEventTypeColor(event.type))}
                              title={event.name}
                            />
                          ))}
                          {events.length > 2 && (
                            <div className="h-2 w-2 rounded-full bg-gray-300 text-[8px] flex items-center justify-center">
                              +
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          )
        })}
      </div>

      {selectedDay && (
        <div className="mt-4 border rounded-lg p-4">
          <h3 className="font-medium mb-2">
            Events for {monthNames[month]} {selectedDay}, {year}
          </h3>
          <div className="space-y-2">
            {getEventsForDay(selectedDay).length > 0 ? (
              getEventsForDay(selectedDay).map((event, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className={cn("mt-0.5", getEventTypeColor(event.type), "text-white")}>
                    {event.type}
                  </Badge>
                  <div>
                    <div className="font-medium">{event.name}</div>
                    <div className="text-sm text-muted-foreground">{event.description}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No astrological events for this day.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
