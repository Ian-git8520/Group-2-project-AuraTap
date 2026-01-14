"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Camera, X } from "lucide-react"

interface QrScannerProps {
  onScanComplete: () => void
}

export function QrScanner({ onScanComplete }: QrScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsScanning(true)

      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setScanProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          stopCamera()
          onScanComplete()
        }
      }, 300)
    } catch {
      // If camera access fails, simulate scan directly
      simulateScan()
    }
  }

  const simulateScan = () => {
    setIsScanning(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setScanProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setIsScanning(false)
        onScanComplete()
      }
    }, 200)
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
    setScanProgress(0)
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">AuraTap</CardTitle>
          <CardDescription className="text-base">Scan the QR code on your table to start ordering</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isScanning ? (
            <div className="space-y-4">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                {/* Scanner overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-primary rounded-lg relative">
                    <div
                      className="absolute left-0 right-0 h-0.5 bg-primary animate-pulse"
                      style={{ top: `${scanProgress}%` }}
                    />
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">Scanning... {scanProgress}%</p>
              </div>
              <Button variant="outline" className="w-full bg-transparent" onClick={stopCamera}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Camera preview will appear here</p>
                </div>
              </div>
              <Button className="w-full h-12 text-lg" onClick={startCamera}>
                <QrCode className="h-5 w-5 mr-2" />
                Scan QR Code
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={simulateScan}>
                Skip for Demo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
