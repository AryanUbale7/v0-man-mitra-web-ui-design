import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

interface SelfHelpData {
  title: string
  description: string
  action: string
}

interface SelfHelpCardProps {
  data: SelfHelpData
}

export function SelfHelpCard({ data }: SelfHelpCardProps) {
  return (
    <Card className="p-6 border-0 bg-gradient-to-br from-accent/20 to-accent/10 rounded-3xl max-w-md shadow-lg hover:shadow-xl transition-all duration-300 gentle-glow backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
          <Sparkles className="w-6 h-6 text-accent-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-accent-foreground mb-2 text-balance">{data.title}</h3>
          <p className="text-sm text-accent-foreground/80 mb-4 text-pretty leading-relaxed">{data.description}</p>
          <Button
            size="sm"
            className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-accent-foreground rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 font-medium group"
          >
            {data.action}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
