
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
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
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  imageHint?: string;
};

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const isOffer = product.price === 'Offer';
  const [isOpen, setIsOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Simulate API call to place bid
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
        description: `Your bid of $${bidAmount} for ${product.name} has been submitted.`,
    });
    setBidAmount('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Card className="overflow-hidden border-none bg-transparent shadow-none">
        <CardContent className="p-0 space-y-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105"
              data-ai-hint={product.imageHint || 'product photo'}
            />
          </div>
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="text-xs text-muted-foreground">
            {isOffer ? 'Accepting Offers' : `Starts at $${product.price}`}
          </p>
          <DialogTrigger asChild>
            <Button variant={isOffer ? 'secondary' : 'default'} className="w-full h-9 text-sm">
              {isOffer ? 'Negotiate' : 'Place Bid'}
            </Button>
          </DialogTrigger>
        </CardContent>
      </Card>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Place a Bid</DialogTitle>
          <DialogDescription>
            You are placing a bid for <span className="font-semibold">{product.name}</span>. The starting price is ${product.price}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bid-amount" className="text-right">
              Bid
            </Label>
            <div className="relative col-span-3">
                 <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">$</span>
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
            {isSubmitting ? <Loader2 className="animate-spin" /> : `Confirm Bid of $${bidAmount || '0'}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
