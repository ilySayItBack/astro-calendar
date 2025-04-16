"use client"

import { useEffect, useRef } from "react"
import { sampleBirthChart } from "@/lib/astro"

interface AstroChartProps {
  birthChart?: typeof sampleBirthChart
}

export function AstroChart({ birthChart = sampleBirthChart }: AstroChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const size = Math.min(canvas.parentElement?.clientWidth || 500, 500)
    canvas.width = size
    canvas.height = size

    // Center point
    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.45

    // Draw chart
    drawAstrologyChart(ctx, centerX, centerY, radius)

    // Add zodiac symbols
    addZodiacSymbols(ctx, centerX, centerY, radius)

    // Add planets
    addPlanets(ctx, centerX, centerY, radius, birthChart.planets)
  }, [canvasRef, birthChart])

  return (
    <div className="flex items-center justify-center w-full">
      <canvas ref={canvasRef} className="max-w-full"></canvas>
    </div>
  )
}

function drawAstrologyChart(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) {
  // Clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // Draw outer circle
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.strokeStyle = "#333"
  ctx.lineWidth = 2
  ctx.stroke()

  // Draw inner circle (representing the earth)
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius * 0.1, 0, Math.PI * 2)
  ctx.fillStyle = "#f0f0f0"
  ctx.fill()
  ctx.strokeStyle = "#333"
  ctx.lineWidth = 1
  ctx.stroke()

  // Draw middle circle (houses)
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius * 0.75, 0, Math.PI * 2)
  ctx.strokeStyle = "#333"
  ctx.lineWidth = 1
  ctx.stroke()

  // Draw house divisions (12 houses)
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 * Math.PI) / 180
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
    ctx.strokeStyle = "#777"
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Draw aspects (sample aspects)
  drawAspects(ctx, centerX, centerY, radius * 0.4)
}

function addZodiacSymbols(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) {
  const zodiacSymbols = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]

  ctx.font = `${radius * 0.08}px Arial`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  for (let i = 0; i < 12; i++) {
    const angle = ((i * 30 - 90) * Math.PI) / 180
    const x = centerX + radius * 0.88 * Math.cos(angle)
    const y = centerY + radius * 0.88 * Math.sin(angle)

    ctx.fillStyle = "#333"
    ctx.fillText(zodiacSymbols[i], x, y)
  }
}

function addPlanets(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  planets: typeof sampleBirthChart.planets,
) {
  ctx.font = `${radius * 0.07}px Arial`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  planets.forEach((planet) => {
    // Convert degrees to radians and adjust for chart orientation
    const angle = ((planet.degree - 90) * Math.PI) / 180

    // Calculate position (slightly randomized distance from center to avoid overlaps)
    const distance = radius * (0.3 + Math.random() * 0.4)
    const x = centerX + distance * Math.cos(angle)
    const y = centerY + distance * Math.sin(angle)

    // Draw planet symbol
    ctx.fillStyle = "#000"
    ctx.fillText(getPlanetSymbol(planet.planet), x, y)

    // Draw small circle around planet
    ctx.beginPath()
    ctx.arc(x, y, radius * 0.04, 0, Math.PI * 2)
    ctx.strokeStyle = planet.isRetrograde ? "#ff0000" : "#555"
    ctx.lineWidth = 1
    ctx.stroke()

    // Add retrograde symbol if needed
    if (planet.isRetrograde) {
      ctx.fillText("℞", x + radius * 0.06, y - radius * 0.06)
    }
  })
}

function getPlanetSymbol(planet: string): string {
  const symbols: Record<string, string> = {
    Sun: "☉",
    Moon: "☽",
    Mercury: "☿",
    Venus: "♀",
    Mars: "♂",
    Jupiter: "♃",
    Saturn: "♄",
    Uranus: "♅",
    Neptune: "♆",
    Pluto: "♇",
  }
  return symbols[planet] || planet[0]
}

function drawAspects(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) {
  // Sample aspects (pairs of planets that form significant angles)
  const aspects = [
    { from: { x: 0.2, y: 0.3 }, to: { x: -0.3, y: -0.2 }, type: "conjunction" },
    { from: { x: -0.1, y: 0.35 }, to: { x: 0.35, y: -0.1 }, type: "trine" },
    { from: { x: -0.25, y: 0.25 }, to: { x: 0.25, y: 0.25 }, type: "opposition" },
    { from: { x: 0.1, y: -0.35 }, to: { x: -0.35, y: -0.1 }, type: "square" },
  ]

  aspects.forEach((aspect) => {
    ctx.beginPath()
    ctx.moveTo(centerX + radius * aspect.from.x, centerY + radius * aspect.from.y)
    ctx.lineTo(centerX + radius * aspect.to.x, centerY + radius * aspect.to.y)

    // Different line styles for different aspects
    switch (aspect.type) {
      case "conjunction":
        ctx.strokeStyle = "#ff5555"
        ctx.lineWidth = 1
        break
      case "trine":
        ctx.strokeStyle = "#55ff55"
        ctx.lineWidth = 1
        break
      case "opposition":
        ctx.strokeStyle = "#5555ff"
        ctx.lineWidth = 1
        break
      case "square":
        ctx.strokeStyle = "#ff5555"
        ctx.setLineDash([2, 2])
        ctx.lineWidth = 1
        break
      default:
        ctx.strokeStyle = "#777"
        ctx.lineWidth = 0.5
    }

    ctx.stroke()
    ctx.setLineDash([]) // Reset line dash
  })
}
