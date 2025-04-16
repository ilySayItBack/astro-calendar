"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar, ChevronLeft, ChevronRight, Download, Plus, Settings, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AstroCalendar } from "@/components/astro-calendar"
import { AstroChart } from "@/components/astro-chart"
import { BirthChart, getAllAstroEvents, sampleBirthChart } from "@/lib/astro"
import { useAuth } from "@/lib/auth-context"
import { TransitPaywall } from "@/components/subscription/transit-paywall"
import { EmailCapture } from "@/components/subscription/email-capture"

export default function DashboardPage() {
  const { user, isPremium, signOut } = useAuth()
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [birthChart, setBirthChart] = useState<BirthChart>(sampleBirthChart)
  const [showEmailCapture, setShowEmailCapture] = useState(false)

  useEffect(() => {
    // Load birth chart from localStorage
    const savedChart = localStorage.getItem("birthChart")
    if (savedChart) {
      try {
        const parsedChart = JSON.parse(savedChart)
        // Convert date string back to Date object
        parsedChart.birthDate = new Date(parsedChart.birthDate)
        setBirthChart(parsedChart)
      } catch (error) {
        console.error("Error parsing birth chart:", error)
      }
    }
  }, [])

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

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Get current month and future events
  const currentDate = new Date()
  const currentMonthStart = new Date(currentYear, currentMonth, 1)
  const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0)
  const nextMonthStart = new Date(currentYear, currentMonth + 1, 1)
  
  const allEvents = getAllAstroEvents(birthChart, currentYear, currentMonth)
  const currentMonthEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate >= currentMonthStart && eventDate <= currentMonthEnd
  })
  
  const futureEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate > currentMonthEnd
  })

  // Filter events by type
  const upcomingTransits = allEvents
    .filter((event) => event.type === "transit")
    .slice(0, 3)
    .map((event) => ({
      icon: "🪐",
      title: event.name,
      date: format(new Date(event.date), "MMMM d, yyyy"),
      description: event.description,
    }))

  const moonPhases = allEvents
    .filter((event) => event.type === "moon")
    .map((event) => ({
      icon: "🌙",
      name: event.name,
      date: format(new Date(event.date), "MMMM d, yyyy"),
    }))

  const favorableDays = allEvents
    .filter((event) => event.type === "planet")
    .slice(0, 3)
    .map((event) => ({
      icon: "✨",
      activity: event.name,
      date: format(new Date(event.date), "MMMM d, yyyy"),
      reason: event.description,
    }))

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Astrological Dashboard</h1>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {isPremium ? "Premium Member" : "Free Account"}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowEmailCapture(true)}>
              Sign In
            </Button>
          )}
        </div>
      </div>

      {showEmailCapture ? (
        <EmailCapture />
      ) : (
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="chart">Birth Chart</TabsTrigger>
            <TabsTrigger value="transits">Transits</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Astrological Calendar</CardTitle>
                  <CardDescription>
                    {monthNames[currentMonth]} {currentYear}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (currentMonth === 0) {
                        setCurrentMonth(11)
                        setCurrentYear(currentYear - 1)
                      } else {
                        setCurrentMonth(currentMonth - 1)
                      }
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (currentMonth === 11) {
                        setCurrentMonth(0)
                        setCurrentYear(currentYear + 1)
                      } else {
                        setCurrentMonth(currentMonth + 1)
                      }
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <AstroCalendar month={currentMonth} year={currentYear} birthChart={birthChart} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chart" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Birth Chart</CardTitle>
                <CardDescription>
                  Based on your birth date and location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AstroChart birthChart={birthChart} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transits" className="space-y-6">
            <TransitPaywall 
              currentMonthEvents={currentMonthEvents} 
              futureEvents={futureEvents} 
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

function getSunSignDescription(sign: string): string {
  const descriptions: Record<string, string> = {
    Aries: "Bold, ambitious, and passionate. You have a strong drive to initiate and lead.",
    Taurus: "Practical, reliable, and patient. You value stability and material comforts.",
    Gemini: "Adaptable, curious, and communicative. You have a versatile and intellectual nature.",
    Cancer: "Nurturing, intuitive, and protective. You have strong emotional connections.",
    Leo: "Confident, creative, and generous. You have a natural flair for leadership.",
    Virgo: "Analytical, practical, and detail-oriented. You have a strong sense of service.",
    Libra: "Diplomatic, fair-minded, and social. You value harmony and relationships.",
    Scorpio: "Intense, passionate, and resourceful. You have deep emotional insight.",
    Sagittarius: "Optimistic, adventurous, and philosophical. You seek knowledge and freedom.",
    Capricorn: "Ambitious, disciplined, and responsible. You have strong leadership potential.",
    Aquarius: "Innovative, independent, and humanitarian. You have a unique perspective.",
    Pisces: "Compassionate, artistic, and intuitive. You have strong spiritual connections.",
  }
  return descriptions[sign] || "Description not available."
}

function getMoonSignDescription(sign: string): string {
  const descriptions: Record<string, string> = {
    Aries: "Emotionally impulsive and enthusiastic. You feel things quickly and passionately.",
    Taurus: "Emotionally stable and security-oriented. You seek comfort and consistency.",
    Gemini: "Emotionally adaptable and curious. You process feelings through communication.",
    Cancer: "Emotionally nurturing and protective. You have deep emotional sensitivity.",
    Leo: "Emotionally expressive and dramatic. You feel things with passion and creativity.",
    Virgo: "Emotionally analytical and practical. You process feelings through service.",
    Libra: "Emotionally diplomatic and balanced. You seek harmony in relationships.",
    Scorpio: "Emotionally intense and transformative. You have deep emotional insight.",
    Sagittarius: "Emotionally optimistic and adventurous. You seek emotional freedom.",
    Capricorn: "Emotionally disciplined and responsible. You process feelings through achievement.",
    Aquarius: "Emotionally detached and innovative. You process feelings through intellect.",
    Pisces: "Emotionally intuitive and compassionate. You have strong spiritual connections.",
  }
  return descriptions[sign] || "Description not available."
}

function getAscendantDescription(sign: string): string {
  const descriptions: Record<string, string> = {
    Aries: "You present yourself as confident, energetic, and direct.",
    Taurus: "You present yourself as stable, reliable, and grounded.",
    Gemini: "You present yourself as curious, adaptable, and communicative.",
    Cancer: "You present yourself as nurturing, protective, and sensitive.",
    Leo: "You present yourself as confident, creative, and generous.",
    Virgo: "You present yourself as practical, efficient, and service-oriented.",
    Libra: "You present yourself as diplomatic, charming, and relationship-focused.",
    Scorpio: "You present yourself as intense, mysterious, and powerful.",
    Sagittarius: "You present yourself as optimistic, adventurous, and philosophical.",
    Capricorn: "You present yourself as responsible, ambitious, and disciplined.",
    Aquarius: "You present yourself as unique, innovative, and humanitarian.",
    Pisces: "You present yourself as compassionate, artistic, and intuitive.",
  }
  return descriptions[sign] || "Description not available."
}
