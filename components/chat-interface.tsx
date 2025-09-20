"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Heart, Lock, Sparkles } from "lucide-react"
import { ChatMessage } from "./chat-message"
import { SelfHelpCard } from "./self-help-card"
import { CrisisAlert } from "./crisis-alert"

interface Message {
  id: string
  content: string
  sender: "user" | "manmitra"
  timestamp: Date
  type?: "normal" | "self-help" | "crisis"
  selfHelpData?: {
    title: string
    description: string
    action: string
  }
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm ManMitra, your AI mental wellness companion. I'm here to listen and support you. How are you feeling today?",
      sender: "manmitra",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response with different types based on keywords
    setTimeout(() => {
      let aiResponse: Message

      if (inputValue.toLowerCase().includes("anxious") || inputValue.toLowerCase().includes("stressed")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "I understand you're feeling anxious. That's completely valid. Let me suggest a breathing exercise that might help.",
          sender: "manmitra",
          timestamp: new Date(),
          type: "self-help",
          selfHelpData: {
            title: "4-7-8 Breathing Exercise",
            description: "This technique can help calm your nervous system and reduce anxiety.",
            action: "Try it now",
          },
        }
      } else if (inputValue.toLowerCase().includes("hurt") || inputValue.toLowerCase().includes("harm")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "I'm concerned about what you've shared. Your safety is important. Please consider reaching out to a mental health professional.",
          sender: "manmitra",
          timestamp: new Date(),
          type: "crisis",
        }
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about what's on your mind?",
          sender: "manmitra",
          timestamp: new Date(),
        }
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto h-[90vh] floating-panel bg-card/80 rounded-3xl overflow-hidden flex flex-col">
      <header className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center gentle-glow">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-accent-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ManMitra
            </h1>
            <p className="text-sm text-muted-foreground font-medium">Your space to talk, your peace of mind</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-card/60 rounded-full border border-border/50">
          <Lock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Confidential</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-muted/20">
        {messages.map((message) => (
          <div key={message.id} className="animate-in slide-in-from-bottom-4 duration-500">
            <ChatMessage message={message} />
            {message.type === "self-help" && message.selfHelpData && (
              <div className="mt-4">
                <SelfHelpCard data={message.selfHelpData} />
              </div>
            )}
            {message.type === "crisis" && (
              <div className="mt-4">
                <CrisisAlert />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-secondary-foreground" />
            </div>
            <Card className="bg-gradient-to-br from-secondary/80 to-secondary/60 p-4 rounded-3xl rounded-tl-lg max-w-xs border-0 shadow-lg hover:shadow-xl transition-all duration-200 gentle-glow">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-secondary-foreground/60 rounded-full star-loading"></div>
                <div
                  className="w-2 h-2 bg-secondary-foreground/60 rounded-full star-loading"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-secondary-foreground/60 rounded-full star-loading"
                  style={{ animationDelay: "0.6s" }}
                ></div>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-border/50 bg-gradient-to-r from-card/60 to-muted/20">
        <div className="flex gap-4 items-end">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts here..."
              className="min-h-[52px] resize-none rounded-3xl bg-input/80 border-border/50 text-pretty pl-6 pr-4 py-4 text-base backdrop-blur-sm focus:bg-input/90 transition-all duration-200"
              disabled={isTyping}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="h-[52px] w-[52px] rounded-3xl bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-200 gentle-glow"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
