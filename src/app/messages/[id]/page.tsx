
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Paperclip, Smile } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Mock data - in a real app, you'd fetch this based on the chat ID
const chatData = {
  id: 1,
  companyName: 'IKEA',
  companyLogo: 'https://picsum.photos/seed/ikea/100',
  isOnline: true,
  messages: [
    { id: 1, sender: 'company', text: 'Hi there! Thanks for reaching out. How can I help you with your furniture needs today?', timestamp: '10:00 AM' },
    { id: 2, sender: 'user', text: 'I saw a bid you accepted. I wanted to ask about the wooden furniture supply.', timestamp: '10:01 AM' },
    { id: 3, sender: 'company', text: 'Of course. We have a wide range of options. Are you interested in a specific type of wood or design?', timestamp: '10:02 AM' },
    { id: 4, sender: 'company', text: 'I can also share our latest catalogue with you.', timestamp: '10:02 AM' },
  ],
};

type Message = typeof chatData.messages[0];

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === 'user';
  return (
    <div className={cn('flex items-end gap-2', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={chatData.companyLogo} />
          <AvatarFallback>{chatData.companyName.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-xs md:max-w-md rounded-2xl px-4 py-2.5',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-lg'
            : 'bg-secondary rounded-bl-lg'
        )}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [messages, setMessages] = useState(chatData.messages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageToAdd: Message = {
        id: Date.now(),
        sender: 'user',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, messageToAdd]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100dvh)] bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 border-b p-3 sticky top-0 bg-background z-10">
        <Button onClick={() => router.back()} variant="ghost" size="icon">
          <ArrowLeft />
        </Button>
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={chatData.companyLogo} />
          <AvatarFallback>{chatData.companyName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="font-semibold">{chatData.companyName}</h2>
          <p className="text-xs text-green-500">{chatData.isOnline ? 'Online' : 'Offline'}</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
         {/* Typing indicator example */}
         {/* <div className="flex items-end gap-2 justify-start">
            <Avatar className="h-8 w-8">
              <AvatarImage src={chatData.companyLogo} />
              <AvatarFallback>{chatData.companyName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="max-w-xs md:max-w-md rounded-2xl px-4 py-2.5 bg-secondary rounded-bl-lg">
                <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-pulse"></span>
                </div>
            </div>
        </div> */}
      </div>

      {/* Input */}
      <footer className="sticky bottom-0 bg-background border-t p-2">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Smile className="text-muted-foreground" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-secondary border-none rounded-full h-11 px-4 focus-visible:ring-1 focus-visible:ring-primary"
          />
          <Button variant="ghost" size="icon">
            <Paperclip className="text-muted-foreground" />
          </Button>
          <Button type="submit" size="icon" className="rounded-full h-11 w-11">
            <Send />
          </Button>
        </form>
      </footer>
    </div>
  );
}
