
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BiddingLeaderboard } from '@/components/bidding/leaderboard';
import { Timer, ArrowLeft, Loader2, PartyPopper } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useCountdown } from '@/hooks/use-countdown';

// Mock data, in a real app you would fetch this based on the [id]
const product = {
  id: 1,
  name: 'Silver-Plated Necklace',
  basePrice: '12000',
  imageUrl: 'https://picsum.photos/seed/necklace/500/500',
  imageHint: 'silver necklace',
  endDate: new Date(Date.now() + 1000 * 10), // 10 seconds from now
};

const bidders = [
  { id: 2, name: 'ZITU User', avatarUrl: 'https://picsum.photos/id/237/100/100', bidAmount: 14000, isCurrentUser: true, timestamp: new Date(Date.now() - 1000 * 60 * 3) },
  { id: 1, name: 'JewelryGems', avatarUrl: 'https://picsum.photos/id/1011/100/100', bidAmount: 13500, isCurrentUser: false, timestamp: new Date(Date.now() - 1000 * 60 * 2) },
  { id: 3, name: 'FashionFinds', avatarUrl: 'https://picsum.photos/id/1025/100/100', bidAmount: 13000, isCurrentUser: false, timestamp: new Date(Date.now() - 1000 * 60 * 4) },
  { id: 4, name: 'StyleHunter', avatarUrl: 'https://picsum.photos/id/1040/100/100', bidAmount: 12500, isCurrentUser: false, timestamp: new Date(Date.now() - 1000 * 60 * 5) },
];

export default function BiddingArenaPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { timeLeft, isEnded } = useCountdown(product.endDate);
  const { toast } = useToast();

  const sortedBidders = [...bidders].sort((a, b) => b.bidAmount - a.bidAmount);
  const winner = sortedBidders[0];
  const isWinner = winner?.isCurrentUser;


  const handleBidSubmit = async () => {
    if (!bidAmount) {
        toast({
            title: 'Error',
            description: 'Please enter a bid amount.',
            variant: 'destructive',
        });
        return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would save the bid to Firestore here.
    console.log({
        productId: product.id,
        bidderId: 'current_user_id', // Replace with actual user ID
        sellerId: 'seller_user_id', // Replace with actual seller ID
        bidAmount: parseFloat(bidAmount),
        timestamp: new Date(),
        status: 'pending',
    });

    setIsSubmitting(false);
    setIsOpen(false);
    toast({
        title: 'Bid Placed Successfully!',
        description: `Your bid of ₹${bidAmount} for ${product.name} has been submitted.`,
    });
    setBidAmount('');
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                      <p className="text-muted-foreground">Base Price: ₹{product.basePrice}</p>
                  </div>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-card border my-4">
                  <Timer className="h-6 w-6 text-primary" />
                  <p className="text-lg font-semibold tabular-nums">
                      {isEnded ? 'Auction has ended' : 'Auction ends in:'} <span className="text-primary">{!isEnded && timeLeft}</span>
                  </p>
              </div>


              {/* Leaderboard */}
              <div className="flex-grow">
                  <BiddingLeaderboard bidders={bidders} isEnded={isEnded} />
              </div>
          </main>
          
          <footer className="sticky bottom-4">
            {isEnded ? (
                isWinner ? (
                    <Button onClick={() => router.push(`/payment/${product.id}`)} className="w-full h-14 text-lg font-bold bg-amber-500 hover:bg-amber-600">
                        <PartyPopper className="mr-2" />
                        Proceed to Payment
                    </Button>
                ) : (
                    <Button className="w-full h-14 text-lg font-bold" disabled>
                        Auction Ended
                    </Button>
                )
            ) : (
              <DialogTrigger asChild>
                <Button className="w-full h-14 text-lg font-bold">
                    Place New Bid
                </Button>
              </DialogTrigger>
            )}
          </footer>
        </div>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Place a Bid</DialogTitle>
          <DialogDescription>
            You are placing a bid for <span className="font-semibold">{product.name}</span>. The starting price is ₹{product.basePrice}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bid-amount" className="text-right">
              Bid
            </Label>
            <div className="relative col-span-3">
                 <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">₹</span>
                 <Input
                    id="bid-amount"
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your amount"
                    className="pl-7"
                />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleBidSubmit} disabled={isSubmitting} className="w-full">
            {isSubmitting ? <Loader2 className="animate-spin" /> : `Confirm Bid of ₹${bidAmount || '0'}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
