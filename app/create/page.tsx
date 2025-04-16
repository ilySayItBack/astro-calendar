"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BirthChart } from "@/lib/astro"

export default function CreatePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    timezone: "UTC",
    houseSystem: "placidus",
    zodiacType: "tropical",
    aspects: "major",
    orbs: "standard",
    calendarType: "monthly",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Create birth chart object
      const birthChart: BirthChart = {
        name: formData.name,
        birthDate: new Date(formData.birthDate),
        birthTime: formData.birthTime,
        birthPlace: formData.birthPlace,
        timezone: formData.timezone,
        sunSign: "Aries", // These would be calculated based on birth data
        moonSign: "Taurus",
        ascendant: "Gemini",
        planets: [
          { planet: "Sun", sign: "Aries", degree: 25, house: 1, isRetrograde: false },
          { planet: "Moon", sign: "Taurus", degree: 15, house: 2, isRetrograde: false },
          { planet: "Mercury", sign: "Aries", degree: 15, house: 1, isRetrograde: false },
          { planet: "Venus", sign: "Taurus", degree: 8, house: 2, isRetrograde: false },
          { planet: "Mars", sign: "Capricorn", degree: 22, house: 10, isRetrograde: false },
          { planet: "Jupiter", sign: "Cancer", degree: 15, house: 4, isRetrograde: false },
          { planet: "Saturn", sign: "Capricorn", degree: 18, house: 10, isRetrograde: false },
          { planet: "Uranus", sign: "Capricorn", degree: 5, house: 9, isRetrograde: false },
          { planet: "Neptune", sign: "Capricorn", degree: 12, house: 9, isRetrograde: false },
          { planet: "Pluto", sign: "Scorpio", degree: 15, house: 8, isRetrograde: false },
        ],
      }

      // In a real app, we would save this to a database
      // For now, we'll just store it in localStorage
      localStorage.setItem("birthChart", JSON.stringify(birthChart))

      // Navigate to the dashboard
      router.push("/dashboard")
    }
  }

  return (
    <div className="container max-w-4xl py-12">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-8">
        <ChevronLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Your Astrological Calendar</h1>
        <p className="text-muted-foreground mt-2">
          Enter your birth details to generate a personalized astrological calendar.
        </p>
      </div>

      <div className="flex justify-between mb-8">
        <div
          className={`flex-1 border-b-2 pb-2 ${
            step >= 1 ? "border-primary text-primary" : "border-muted text-muted-foreground"
          }`}
        >
          1. Birth Information
        </div>
        <div
          className={`flex-1 border-b-2 pb-2 ${
            step >= 2 ? "border-primary text-primary" : "border-muted text-muted-foreground"
          }`}
        >
          2. Chart Options
        </div>
        <div
          className={`flex-1 border-b-2 pb-2 ${
            step >= 3 ? "border-primary text-primary" : "border-muted text-muted-foreground"
          }`}
        >
          3. Calendar Preferences
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Birth Information</CardTitle>
                <CardDescription>
                  Enter your birth details accurately for the most precise astrological calculations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Label htmlFor="birthTime">Birth Time</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            The more accurate your birth time, the more precise your astrological chart will be.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="birthTime"
                    name="birthTime"
                    type="time"
                    value={formData.birthTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthPlace">Birth Place</Label>
                  <Input
                    id="birthPlace"
                    name="birthPlace"
                    placeholder="City, Country"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select value={formData.timezone} onValueChange={(value) => handleSelectChange("timezone", value)}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                      <SelectItem value="MST">MST (Mountain Standard Time)</SelectItem>
                      <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Chart Options</CardTitle>
                <CardDescription>Customize your astrological chart settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="houseSystem">House System</Label>
                  <Select
                    value={formData.houseSystem}
                    onValueChange={(value) => handleSelectChange("houseSystem", value)}
                  >
                    <SelectTrigger id="houseSystem">
                      <SelectValue placeholder="Select house system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="placidus">Placidus</SelectItem>
                      <SelectItem value="koch">Koch</SelectItem>
                      <SelectItem value="equal">Equal</SelectItem>
                      <SelectItem value="whole-sign">Whole Sign</SelectItem>
                      <SelectItem value="porphyry">Porphyry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zodiacType">Zodiac Type</Label>
                  <Select
                    value={formData.zodiacType}
                    onValueChange={(value) => handleSelectChange("zodiacType", value)}
                  >
                    <SelectTrigger id="zodiacType">
                      <SelectValue placeholder="Select zodiac type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tropical">Tropical</SelectItem>
                      <SelectItem value="sidereal">Sidereal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aspects">Aspects to Include</Label>
                  <Select
                    value={formData.aspects}
                    onValueChange={(value) => handleSelectChange("aspects", value)}
                  >
                    <SelectTrigger id="aspects">
                      <SelectValue placeholder="Select aspects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="major">Major Aspects Only</SelectItem>
                      <SelectItem value="all">All Aspects</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orbs">Orb Settings</Label>
                  <Select value={formData.orbs} onValueChange={(value) => handleSelectChange("orbs", value)}>
                    <SelectTrigger id="orbs">
                      <SelectValue placeholder="Select orb settings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tight">Tight (Small Orbs)</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="wide">Wide (Large Orbs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>Calendar Preferences</CardTitle>
                <CardDescription>Customize how your astrological calendar will be displayed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="calendarType">Calendar Type</Label>
                  <Select
                    value={formData.calendarType}
                    onValueChange={(value) => handleSelectChange("calendarType", value)}
                  >
                    <SelectTrigger id="calendarType">
                      <SelectValue placeholder="Select calendar type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly View</SelectItem>
                      <SelectItem value="weekly">Weekly View</SelectItem>
                      <SelectItem value="daily">Daily View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </>
          )}

          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            <Button type="submit" className="ml-auto">
              {step === 3 ? "Create Calendar" : "Next"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
