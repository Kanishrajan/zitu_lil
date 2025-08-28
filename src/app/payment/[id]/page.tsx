
'use client';

import { ArrowLeft, CreditCard, Landmark, Loader2, Lock, ShieldCheck, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


// Mock data, in a real app you would fetch this based on the [id]
const product = {
  id: 1,
  name: 'Minimalist Watch',
  finalBid: 280,
  imageUrl: 'https://picsum.photos/seed/watch/500/500',
  imageHint: 'elegant watch',
};

const paymentMethods = [
    { id: 'card', name: 'Card', icon: CreditCard },
    { id: 'upi', name: 'UPI', icon: Wallet },
    { id: 'netbanking', name: 'Net Banking', icon: Landmark },
]


export default function PaymentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    
    toast({
        title: 'Payment Successful!',
        description: 'Your funds are held securely until delivery is confirmed.',
    });
    // Here you would redirect to an order tracking page
    // router.push(`/orders/${product.id}`);
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <div className="relative flex flex-col min-h-[calc(100vh-2rem)]">
        <header className="flex items-center justify-center relative py-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="absolute left-0">
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-xl font-bold tracking-tight">Secure Payment</h1>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Complete Your Purchase</CardTitle>
                    <CardDescription>You won the bid for <strong>{product.name}</strong>!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="relative w-40 h-40 mx-auto rounded-lg overflow-hidden border-2 shadow-lg">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        data-ai-hint={product.imageHint}
                      />
                    </div>
                    <div className='text-center'>
                        <p className="text-muted-foreground">Final Price</p>
                        <p className="text-4xl font-bold tracking-tighter">${product.finalBid}</p>
                    </div>
                    
                    <Separator />

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
                        <Carousel
                          opts={{
                            align: "start",
                          }}
                          className="w-full max-w-sm mx-auto"
                        >
                          <CarouselContent>
                            {paymentMethods.map((method) => (
                              <CarouselItem key={method.id} className="basis-1/2">
                                <div className="p-1">
                                <Button
                                    variant={selectedMethod === method.id ? 'default' : 'outline'}
                                    className="w-full h-20 flex flex-col gap-2"
                                    onClick={() => setSelectedMethod(method.id)}
                                >
                                    <method.icon className="w-6 h-6"/>
                                    <span>{method.name}</span>
                                </Button>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                    </div>

                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <span>Funds are held securely by ZITU until you confirm delivery.</span>
                    </div>
                </CardContent>
            </Card>

        </main>

        <footer className="sticky bottom-4">
            <Button onClick={handlePayment} disabled={isProcessing} className="w-full h-14 text-lg font-bold">
                {isProcessing ? <Loader2 className="animate-spin" /> : `Pay $${product.finalBid} Securely`}
                {!isProcessing && <Lock className="ml-2 h-5 w-5" />}
            </Button>
        </footer>
      </div>
    </div>
  );
}

