"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Heart } from "lucide-react"

export function CrisisAlert() {
  const helplines = [
    { name: "Vandrevala Foundation", number: "+91-9999-666-555" },
    { name: "AASRA", number: "+91-22-2754-6669" },
    { name: "Sneha Foundation", number: "+91-44-2464-0050" },
  ]

  return (
    <Card className="p-6 border-0 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl max-w-md shadow-lg backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-orange-800 mb-2 text-balance">You're Not Alone</h3>
          <p className="text-sm text-orange-700/80 mb-4 text-pretty leading-relaxed">
            It sounds like you're going through a lot. Please reach out for immediate support. You are valued and cared
            for.
          </p>
          <div className="space-y-3">
            {helplines.map((helpline, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/60 rounded-2xl backdrop-blur-sm shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold text-orange-800 text-balance">{helpline.name}</p>
                  <p className="text-xs text-orange-600 font-medium">{helpline.number}</p>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                  onClick={() => window.open(`tel:${helpline.number}`)}
                >
                  <Phone className="w-3 h-3 mr-2" />
                  Call Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
