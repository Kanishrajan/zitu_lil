
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BiddingLeaderboard } from '@/components/bidding/leaderboard';
import { Timer, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock data, in a real app you would fetch this based on the [id]
const product = {
  id: 1,
  name: 'Minimalist Watch',
  basePrice: '250',
  imageUrl: 'https://picsum.photos/seed/watch/500/500',
  imageHint: 'elegant watch',
  endDate: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes from now
};

const bidders = [
  { id: 1, name: 'DesignMaven', avatarUrl: 'https://picsum.photos/id/1011/100/100', bidAmount: 280, isCurrentUser: false, timestamp: new Date(Date.now() - 1000 * 60 * 2) },
  { id: 2, name: 'ZITU User', avatarUrl: 'https://picsum.photos/id/237/100/100', bidAmount: 275, isCurrentUser: true, timestamp: new Date(Date.now() - 1000 * 60 * 3) },
  { id: 3, name: 'Artisan Finds', avatarUrl: 'https://picsum.photos/id/1025/100/100', bidAmount: 260, isCurrentUser: false, timestamp: new Date(Date.now() - 1000 * 60 * 4) },
  { id: 4, name: 'StyleHunter', avatarUrl: 'https://picsum.photos/id/1040/100/100', bidAmount: 255, isCurrentUser: false, timestamp: new Date(Date.now() - 1000 * 60 * 5) },
];

export default function BiddingArenaPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <div className="relative flex flex-col min-h-[calc(100vh-2rem)]">
        <header className="flex items-center justify-center relative py-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="absolute left-0">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-xl font-bold tracking-tight">Bidding Arena</h1>
        </header>
        
        <main className="flex-grow flex flex-col">
            {/* Product Info */}
            <div className="flex flex-col items-center text-center space-y-4 py-6">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-primary shadow-lg">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        data-ai-hint={product.imageHint}
                    />
                </div>
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p className="text-muted-foreground">Base Price: ${product.basePrice}</p>
                </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-card border my-4">
                <Timer className="h-6 w-6 text-primary" />
                <p className="text-lg font-semibold tabular-nums">
                    Auction ends in: <span className="text-primary">04:59</span>
                </p>
            </div>


            {/* Leaderboard */}
            <div className="flex-grow">
                <BiddingLeaderboard bidders={bidders} />
            </div>
        </main>
        
        <footer className="sticky bottom-4">
            <Button className="w-full h-14 text-lg font-bold">
                Place New Bid
            </Button>
        </footer>
      </div>
    </div>
  );
}
