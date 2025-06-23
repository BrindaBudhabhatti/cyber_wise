
"use client";

import { useState, useRef, useEffect } from "react";
import type { CyberBuddyChatbotInput, CyberBuddyChatbotOutput } from "@/ai/flows/cyberbuddy-chatbot";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type Message = {
  role: "user" | "bot";
  content: string;
};

type ChatProps = {
  sendMessage: (input: CyberBuddyChatbotInput) => Promise<CyberBuddyChatbotOutput>;
};

export function ChatInterface({ sendMessage }: ChatProps) {
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: "Hello! I'm CyberBuddy. How can I help you stay safe online today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessage({ query: input, language: i18n.language });
      const botMessage: Message = { role: "bot", content: response.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { role: "bot", content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Chatbot error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-card border rounded-lg shadow-lg">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef as any}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "bot" && (
                <Avatar className="h-8 w-8">
                   <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                    </div>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-3 text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                 <Avatar className="h-8 w-8">
                   <div className="flex h-full w-full items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <User className="h-5 w-5" />
                    </div>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8">
                   <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                    </div>
                </Avatar>
                <div className="bg-muted rounded-xl px-4 py-3 text-sm flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                    <span>CyberBuddy is thinking...</span>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon" aria-label="Send message">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
