import { Card } from "@/components/ui/card"
import { Heart, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "manmitra"
  timestamp: Date
  type?: "normal" | "self-help" | "crisis"
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"

  return (
    <div className={`flex items-start gap-4 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
          isUser
            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
            : "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground"
        }`}
      >
        {isUser ? <User className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
      </div>

      <Card
        className={`p-4 rounded-3xl max-w-xs sm:max-w-md lg:max-w-lg text-pretty shadow-lg hover:shadow-xl transition-all duration-200 border-0 ${
          isUser
            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-tr-lg ml-auto"
            : "bg-gradient-to-br from-secondary/90 to-secondary/70 text-secondary-foreground rounded-tl-lg backdrop-blur-sm"
        }`}
      >
        <p className="text-sm leading-relaxed font-medium">{message.content}</p>
        <p
          className={`text-xs mt-3 opacity-70 font-medium ${
            isUser ? "text-primary-foreground/70" : "text-secondary-foreground/70"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </Card>
    </div>
  )
}
