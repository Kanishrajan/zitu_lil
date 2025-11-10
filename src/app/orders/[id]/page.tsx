
'use client';

import { ArrowLeft, CheckCircle, Circle, MessageSquare, Package, Rocket, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

// Mock data, in a real app you would fetch this based on the [id]
const order = {
  id: 1,
  product: {
    name: 'Minimalist Watch',
    finalBid: 22000,
    imageUrl: 'https://picsum.photos/seed/watch/500/500',
    imageHint: 'elegant watch',
  },
  seller: {
    name: 'DesignMaven',
    avatarUrl: 'https://picsum.photos/id/1011/100/100',
  },
  status: 'preparing',
  timeline: [
    { status: 'Payment Confirmed', date: new Date(), completed: true },
    { status: 'Seller Preparing Order', date: new Date(), completed: true },
    { status: 'Shipped', date: null, completed: false },
    { status: 'Delivered', date: null, completed: false },
  ]
};

function StatusIcon({ status, completed }: { status: string; completed: boolean }) {
    const iconProps = {
        className: cn("h-5 w-5", completed ? "text-primary" : "text-muted-foreground")
    };
    if (completed) {
        return <CheckCircle {...iconProps} />;
    }
    switch (status) {
        case "Shipped": return <Rocket {...iconProps} />;
        case "Delivered": return <Package {...iconProps} />;
        default: return <Circle {...iconProps} />;
    }
}

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <div className="relative flex flex-col min-h-[calc(100vh-2rem)]">
        <header className="flex items-center justify-center relative py-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="absolute left-0">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-xl font-bold tracking-tight">Order Details</h1>
        </header>

        <main className="flex-grow flex flex-col space-y-6">
          <Card>
            <CardHeader>
                <CardTitle>Your Order</CardTitle>
                <CardDescription>Track the status of your purchase.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden border">
                        <Image src={order.product.imageUrl} alt={order.product.name} fill className="object-cover" data-ai-hint={order.product.imageHint} />
                    </div>
                    <div>
                        <p className="font-semibold">{order.product.name}</p>
                        <p className="text-muted-foreground">Final Price: ₹{order.product.finalBid}</p>
                    </div>
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {order.timeline.map((event, index) => (
                        <li key={index} className="flex gap-4">
                            <div>
                                <StatusIcon status={event.status} completed={event.completed} />
                                {index < order.timeline.length - 1 && (
                                    <div className={cn("h-full w-px bg-border ml-[9.5px] mt-1", order.timeline[index + 1].completed && "bg-primary")} />
                                )}
                            </div>
                            <div>
                                <p className={cn("font-medium", event.completed && "text-primary")}>{event.status}</p>
                                {event.date && <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString()}</p>}
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
                <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <Avatar>
                        <AvatarImage src={order.seller.avatarUrl} alt={order.seller.name} />
                        <AvatarFallback>{order.seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{order.seller.name}</p>
                </div>
                 <Button>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat with Seller
                </Button>
            </CardContent>
            <CardFooter className='flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 p-4 rounded-b-lg'>
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>Your payment is held securely by ZITU until you confirm delivery.</span>
            </CardFooter>
           </Card>

        </main>
      </div>
    </div>
  );
}
