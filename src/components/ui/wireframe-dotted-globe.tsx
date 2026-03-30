"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

const CITIES: { name: string; coords: [number, number] }[] = [
  { name: "Oslo", coords: [10.7522, 59.9139] },
  { name: "Los Angeles", coords: [-118.2437, 34.0522] },
  { name: "Mexico City", coords: [-99.1332, 19.4326] },
  { name: "Brasília", coords: [-47.9297, -15.7801] },
  { name: "Tokyo", coords: [139.6917, 35.6895] },
  { name: "Dubai", coords: [55.2708, 25.2048] },
  { name: "Istanbul", coords: [28.9784, 41.0082] },
]

// Arcs from Oslo to every other city
const CONNECTIONS = CITIES.slice(1).map((city) => ({ from: CITIES[0], to: city }))

interface GlobeMarketMapProps {
  className?: string
}

export default function GlobeMarketMap({ className = "" }: GlobeMarketMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const W = container.clientWidth
    const H = Math.round(W * 0.72)
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`
    ctx.scale(dpr, dpr)

    const cx = W / 2
    const cy = H / 2
    const radius = Math.min(W, H) / 2.3

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([cx, cy])
      .clipAngle(90)
      .rotate([20, -30, 0])

    const path = d3.geoPath().projection(projection).context(ctx)

    // ── Dot generation ──────────────────────────────────────────
    const pointInRing = (pt: [number, number], ring: number[][]): boolean => {
      const [x, y] = pt
      let inside = false
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i]
        const [xj, yj] = ring[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
      }
      return inside
    }

    const pointInFeature = (pt: [number, number], feature: any): boolean => {
      const { type, coordinates } = feature.geometry
      if (type === "Polygon") {
        if (!pointInRing(pt, coordinates[0])) return false
        for (let i = 1; i < coordinates.length; i++) if (pointInRing(pt, coordinates[i])) return false
        return true
      }
      if (type === "MultiPolygon") {
        for (const poly of coordinates) {
          if (pointInRing(pt, poly[0])) {
            let inHole = false
            for (let i = 1; i < poly.length; i++) if (pointInRing(pt, poly[i])) { inHole = true; break }
            if (!inHole) return true
          }
        }
        return false
      }
      return false
    }

    const makeDots = (feature: any, step = 1.4): [number, number][] => {
      const dots: [number, number][] = []
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature)
      for (let lng = minLng; lng <= maxLng; lng += step)
        for (let lat = minLat; lat <= maxLat; lat += step) {
          const p: [number, number] = [lng, lat]
          if (pointInFeature(p, feature)) dots.push(p)
        }
      return dots
    }

    let allDots: [number, number][] = []
    let landFeatures: any = null

    // ── Render ──────────────────────────────────────────────────
    const render = (elapsed: number) => {
      const dark = document.documentElement.classList.contains("dark")

      ctx.clearRect(0, 0, W, H)
      const sc = projection.scale()

      // Ocean
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, sc, 0, 2 * Math.PI)
      const grad = ctx.createRadialGradient(cx - sc * 0.25, cy - sc * 0.25, sc * 0.05, cx, cy, sc)
      if (dark) {
        grad.addColorStop(0, "#0d0d1a")
        grad.addColorStop(1, "#050508")
      } else {
        grad.addColorStop(0, "#e8ecf2")
        grad.addColorStop(1, "#d4dae6")
      }
      ctx.fillStyle = grad
      ctx.fill()
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)"
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.restore()

      // Graticule
      const grat = d3.geoGraticule().step([30, 30])()
      ctx.beginPath()
      path(grat)
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.07)"
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Land dots
      ctx.fillStyle = dark ? "rgba(255,255,255,0.28)" : "rgba(30,40,60,0.35)"
      allDots.forEach(([lng, lat]) => {
        const p = projection([lng, lat])
        if (!p) return
        ctx.beginPath()
        ctx.arc(p[0], p[1], 1.05, 0, 2 * Math.PI)
        ctx.fill()
      })

      // Land outlines
      if (landFeatures) {
        ctx.beginPath()
        landFeatures.features.forEach((f: any) => path(f))
        ctx.strokeStyle = dark ? "rgba(255,255,255,0.15)" : "rgba(30,40,60,0.20)"
        ctx.lineWidth = 0.6
        ctx.stroke()
      }

      // ── Arcs (Oslo → each city) ──────────────────────────────
      CONNECTIONS.forEach(({ from, to }, idx) => {
        // Build polyline with many points so d3 clips it correctly
        const numSteps = 80
        const coords: [number, number][] = Array.from({ length: numSteps + 1 }, (_, i) =>
          d3.geoInterpolate(from.coords, to.coords)(i / numSteps) as [number, number]
        )
        const arcFeature: any = {
          type: "Feature",
          geometry: { type: "LineString", coordinates: coords },
          properties: {},
        }

        // Static dim arc
        ctx.beginPath()
        path(arcFeature)
        ctx.strokeStyle = "#e94f37"
        ctx.globalAlpha = 0.22
        ctx.lineWidth = 1.2
        ctx.setLineDash([])
        ctx.stroke()
        ctx.globalAlpha = 1

        // Flowing dots (3 per arc, staggered)
        const numDots = 3
        for (let d = 0; d < numDots; d++) {
          const t = ((elapsed * 0.22 + idx * 0.18 + d / numDots) % 1)
          const pt = d3.geoInterpolate(from.coords, to.coords)(t) as [number, number]
          const projected = projection(pt)
          if (!projected) continue

          // Fade at arc ends
          const alpha = 0.55 + 0.45 * Math.sin(t * Math.PI)
          const dotR = 1.8 + 0.8 * Math.sin(t * Math.PI)
          ctx.beginPath()
          ctx.arc(projected[0], projected[1], dotR, 0, 2 * Math.PI)
          ctx.fillStyle = "#e94f37"
          ctx.globalAlpha = alpha
          ctx.fill()
          ctx.globalAlpha = 1
        }
      })

      // ── City markers ─────────────────────────────────────────
      CITIES.forEach(({ name, coords }) => {
        const p = projection(coords)
        if (!p) return
        const isHub = name === "Oslo"
        const r = isHub ? 4.5 : 3

        // Pulsing ring on hub
        if (isHub) {
          const pulse = 0.5 + 0.5 * Math.sin(elapsed * 2.5)
          ctx.beginPath()
          ctx.arc(p[0], p[1], r + 4 + pulse * 4, 0, 2 * Math.PI)
          ctx.strokeStyle = "#e94f37"
          ctx.globalAlpha = 0.18 * (1 - pulse)
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.globalAlpha = 1
        }

        // Outer ring
        ctx.beginPath()
        ctx.arc(p[0], p[1], r, 0, 2 * Math.PI)
        ctx.strokeStyle = "#e94f37"
        ctx.lineWidth = 1.5
        ctx.globalAlpha = 0.7
        ctx.stroke()
        ctx.globalAlpha = 1

        // Inner fill
        ctx.beginPath()
        ctx.arc(p[0], p[1], r * 0.45, 0, 2 * Math.PI)
        ctx.fillStyle = "#e94f37"
        ctx.fill()

        // Label
        ctx.font = `${isHub ? "600 11px" : "500 10px"} Inter, system-ui, sans-serif`
        ctx.fillStyle = dark
          ? (isHub ? "#ffffff" : "rgba(255,255,255,0.85)")
          : (isHub ? "#0f172a" : "rgba(15,23,42,0.75)")
        ctx.globalAlpha = 1
        ctx.fillText(name, p[0] + r + 5, p[1] + 4)
      })
    }

    // ── Load data ────────────────────────────────────────────────
    fetch(
      "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
    )
      .then((r) => r.json())
      .then((data) => {
        landFeatures = data
        landFeatures.features.forEach((f: any) => {
          allDots.push(...makeDots(f))
        })
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))

    // ── Animation + drag ─────────────────────────────────────────
    const rot = [20, -30, 0]
    let autoRotate = true

    const timer = d3.timer((elapsed) => {
      if (autoRotate) {
        rot[0] += 0.18
        projection.rotate(rot as [number, number, number])
      }
      render(elapsed / 1000)
    })

    let drag: { x: number; y: number; rot: number[] } | null = null

    const onDown = (e: MouseEvent) => {
      autoRotate = false
      drag = { x: e.clientX, y: e.clientY, rot: [...rot] }
    }
    const onMove = (e: MouseEvent) => {
      if (!drag) return
      rot[0] = drag.rot[0] + (e.clientX - drag.x) * 0.4
      rot[1] = Math.max(-70, Math.min(70, drag.rot[1] - (e.clientY - drag.y) * 0.4))
      projection.rotate(rot as [number, number, number])
    }
    const onUp = () => { drag = null; setTimeout(() => { autoRotate = true }, 80) }

    canvas.addEventListener("mousedown", onDown)
    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseup", onUp)

    return () => {
      timer.stop()
      canvas.removeEventListener("mousedown", onDown)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseup", onUp)
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative w-full select-none ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/30 text-sm tracking-wide">Loading globe…</div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full rounded-2xl cursor-grab active:cursor-grabbing"
        style={{ display: "block" }}
      />
      <p className="absolute bottom-3 right-4 text-[10px] text-white/25 pointer-events-none select-none">
        Drag to rotate
      </p>
    </div>
  )
}
