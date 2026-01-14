"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Camera, X } from "lucide-react"



export function QrScanner({ onScanComplete }) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video{ facingMode"environment" },
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
    
      
        
          
            
          
          AuraTap
          Scan the QR code on your table to start ordering
        
        
          {isScanning ? (
            
              
                
                {/* Scanner overlay */}
                
                  
                    
                    
                    
                    
                    
                  
                
              
              
                
                  
                
                Scanning... {scanProgress}%
              
              
                
                Cancel
              
            
          ) (
            
              
                
                  
                  Camera preview will appear here
                
              
              
                
                Scan QR Code
              
              
                Skip for Demo
              
            
          )}
        
      
    
  )
}
