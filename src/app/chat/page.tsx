import { ChatInterface } from "@/components/chat-interface";
import { cyberBuddyChatbot } from "@/ai/flows/cyberbuddy-chatbot";

export default function ChatPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">CyberBuddy Chat</h1>
        <p className="text-muted-foreground">
          Ask me anything about cybercrime, laws, and safety tips!
        </p>
      </div>
      <ChatInterface sendMessage={cyberBuddyChatbot} />
    </div>
  );
}
