
'use client';

import { Search, Star, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const chats = [
  { id: 1, company: 'IKEA', logo: 'https://picsum.photos/seed/ikea/100', lastMessage: 'Great, we will review the bid and get back to you.', timestamp: '10m ago', unread: 2 },
  { id: 2, company: 'UrbanLadder', logo: 'https://picsum.photos/seed/urban/100', lastMessage: 'Can you share your latest furniture catalogue?', timestamp: '1h ago', unread: 0 },
  { id: 3, company: 'Pepperfry', logo: 'https://picsum.photos/seed/pepperfry/100', lastMessage: 'Order confirmed for 500 units of Boat accessories.', timestamp: '5h ago', unread: 0, starred: true },
  { id: 4, company: 'Samsung', logo: 'https://picsum.photos/seed/samsung/100', lastMessage: 'We have placed a new bid for the Oakwood Table set.', timestamp: 'yesterday', unread: 1 },
  { id: 5, company: 'Apple Inc.', logo: 'https://picsum.photos/seed/apple/100', lastMessage: 'Payment of $5,000 has been processed.', timestamp: '2d ago', unread: 0, starred: true },
  { id: 6, company: 'OnePlus', logo: 'https://picsum.photos/seed/oneplus/100', lastMessage: 'Inquiry about bulk headphone order.', timestamp: '3d ago', unread: 0 },
];

function ChatListItem({ chat }: { chat: typeof chats[0] }) {
    const router = useRouter();

    const handleChatClick = () => {
        router.push(`/messages/${chat.id}`);
    }

    return (
        <div 
            className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-accent"
            onClick={handleChatClick}
        >
            <Avatar className="h-12 w-12 border">
                <AvatarImage src={chat.logo} alt={chat.company} />
                <AvatarFallback>{chat.company.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                    <h3 className={cn("font-semibold truncate", chat.unread > 0 && "text-primary")}>{chat.company}</h3>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">{chat.timestamp}</p>
                </div>
                <div className="flex justify-between items-start mt-1">
                    <p className="text-sm text-muted-foreground truncate pr-4">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                        <Badge className="h-5 w-5 flex items-center justify-center p-0">{chat.unread}</Badge>
                    )}
                </div>
            </div>
        </div>
    )
}


export default function MessagesPage() {
  const unreadChats = chats.filter(c => c.unread > 0);
  const starredChats = chats.filter(c => c.starred);

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
                <p className="text-muted-foreground">All your business conversations in one place.</p>
            </div>
            
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search by company name..." className="w-full pl-10 h-11" />
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all" className="gap-2">
                        <MessageSquare className="h-4 w-4"/> All
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="gap-2">
                        <Badge className="p-1 h-auto absolute -top-1 -right-1">{unreadChats.length}</Badge>
                        Unread
                    </TabsTrigger>
                    <TabsTrigger value="starred" className="gap-2">
                        <Star className="h-4 w-4"/> Starred
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <div className="space-y-1">
                        {chats.map(chat => <ChatListItem key={chat.id} chat={chat} />)}
                    </div>
                </TabsContent>
                <TabsContent value="unread">
                     <div className="space-y-1">
                        {unreadChats.length > 0 ? (
                            unreadChats.map(chat => <ChatListItem key={chat.id} chat={chat} />)
                        ) : (
                            <p className="text-center text-muted-foreground p-8">No unread messages.</p>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="starred">
                     <div className="space-y-1">
                        {starredChats.length > 0 ? (
                            starredChats.map(chat => <ChatListItem key={chat.id} chat={chat} />)
                        ) : (
                            <p className="text-center text-muted-foreground p-8">No starred messages.</p>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
