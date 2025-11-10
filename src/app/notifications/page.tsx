
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Smartphone, Sofa, Headphones, FileText, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

const notifications = {
  phones: [
    { id: 1, type: 'bid_accepted', text: 'Apple bid accepted by IKEA for Wooden Furniture supply', timestamp: '2h ago', unread: true, from: 'IKEA', avatar: 'https://picsum.photos/seed/ikea/100' },
    { id: 2, type: 'new_inquiry', text: 'Samsung received new inquiry from UrbanLadder', timestamp: '5h ago', unread: false, from: 'UrbanLadder', avatar: 'https://picsum.photos/seed/urban/100' },
    { id: 3, type: 'bid_won', text: 'You won the bid for 10,000 iPhone 15 screens', timestamp: '1d ago', unread: false, from: 'Screen Suppliers', avatar: 'https://picsum.photos/seed/screen/100' },
  ],
  furniture: [
    { id: 4, type: 'order_confirmed', text: 'Boat Accessories order request confirmed by Pepperfry', timestamp: '3h ago', unread: true, from: 'Pepperfry', avatar: 'https://picsum.photos/seed/pepperfry/100' },
    { id: 5, type: 'new_bid', text: 'New bid from Samsung for your Oakwood Table set', timestamp: '6h ago', unread: true, from: 'Samsung', avatar: 'https://picsum.photos/seed/samsung/100' },
  ],
  accessories: [
    { id: 6, type: 'payment_received', text: 'Payment of $5,000 received from Apple Inc.', timestamp: 'yesterday', unread: false, from: 'Apple', avatar: 'https://picsum.photos/seed/apple/100' },
    { id: 7, type: 'new_inquiry', text: 'Inquiry about bulk headphone order from OnePlus', timestamp: '2d ago', unread: false, from: 'OnePlus', avatar: 'https://picsum.photos/seed/oneplus/100' },
  ]
};

const typeIcons = {
    bid_accepted: <CheckCircle className="h-5 w-5 text-green-500" />,
    new_inquiry: <FileText className="h-5 w-5 text-blue-500" />,
    order_confirmed: <ShoppingCart className="h-5 w-5 text-primary" />,
    new_bid: <AlertCircle className="h-5 w-5 text-amber-500" />,
    payment_received: <CheckCircle className="h-5 w-5 text-green-500" />,
    bid_won: <CheckCircle className="h-5 w-5 text-green-500" />,
}

function NotificationItem({ notification }: { notification: typeof notifications.phones[0] }) {
    const router = useRouter();

    const handleClick = () => {
        // In a real app, this would navigate to a chat or details page
        if (notification.type === 'order_confirmed' || notification.type === 'bid_won') {
            router.push(`/orders/${notification.id}`);
        } else {
            console.log(`Notification ${notification.id} clicked.`);
        }
    }

    return (
        <div 
            onClick={handleClick}
            className={cn(
                "flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-colors",
                notification.unread ? "bg-primary/5" : "bg-transparent",
                "hover:bg-accent"
            )}
        >
            <div className="w-10 h-10 flex items-center justify-center">
                 {typeIcons[notification.type as keyof typeof typeIcons] || <div className="h-5 w-5" />}
            </div>
            <div className="flex-1 space-y-1">
                 <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border">
                        <AvatarImage src={notification.avatar} alt={notification.from} />
                        <AvatarFallback>{notification.from.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm"><span className="font-semibold">{notification.from}</span> {notification.text.replace(notification.from, '')}</p>
                 </div>
                <p className="text-xs text-muted-foreground ml-10">{notification.timestamp}</p>
            </div>
            {notification.unread && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1 animate-pulse"></div>
            )}
        </div>
    )
}


function NotificationList({ notifications }: { notifications: (typeof notifications.phones[0])[] }) {
    const sortedNotifications = [...notifications].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return (
        <div className="space-y-2">
            {sortedNotifications.length > 0 ? (
                sortedNotifications.map(n => <NotificationItem key={n.id} notification={n} />)
            ) : (
                <p className="text-center text-muted-foreground p-8">No notifications here.</p>
            )}
        </div>
    )
}

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-0 md:px-4 py-4 max-w-2xl">
        <div className="space-y-4">
            <div className='px-4'>
                <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                <p className="text-muted-foreground">Updates on your business activities.</p>
            </div>
            <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="phones" className="gap-2">
                    <Smartphone className="h-4 w-4" /> Phones
                </TabsTrigger>
                <TabsTrigger value="furniture" className="gap-2">
                    <Sofa className="h-4 w-4" /> Furniture
                </TabsTrigger>
                <TabsTrigger value="accessories" className="gap-2">
                    <Headphones className="h-4 w-4" /> Accessories
                </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className='px-0 md:px-4'>
                <NotificationList notifications={[...notifications.phones, ...notifications.furniture, ...notifications.accessories]} />
            </TabsContent>
            <TabsContent value="phones" className='px-0 md:px-4'>
                <NotificationList notifications={notifications.phones} />
            </TabsContent>
            <TabsContent value="furniture" className='px-0 md:px-4'>
                <NotificationList notifications={notifications.furniture} />
            </TabsContent>
            <TabsContent value="accessories" className='px-0 md:px-4'>
                <NotificationList notifications={notifications.accessories} />
            </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
