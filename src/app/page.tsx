
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductCard } from '@/components/marketplace/product-card';
import { Skeleton } from '@/components/ui/skeleton';


const products = [
  { id: 1, name: 'Silver-Plated Necklace', price: '150', imageUrl: 'https://picsum.photos/seed/necklace/500/500', imageHint: 'silver necklace' },
  { id: 2, name: 'Silk Scarf', price: '80', imageUrl: 'https://picsum.photos/seed/scarf/500/500', imageHint: 'silk scarf' },
  { id: 3, name: 'Gold-Plated Earrings', price: '120', imageUrl: 'https://picsum.photos/seed/earrings/500/500', imageHint: 'gold earrings' },
  { id: 4, name: 'Leather Wallet', price: 'Offer', imageUrl: 'https://picsum.photos/seed/wallet/500/500', imageHint: 'leather wallet' },
  { id: 5, name: 'Designer Sunglasses', price: '180', imageUrl: 'https://picsum.photos/seed/sunglasses/500/500', imageHint: 'stylish sunglasses' },
  { id: 6, name: 'Beaded Bracelet', price: '45', imageUrl: 'https://picsum.photos/seed/bracelet/500/500', imageHint: 'beaded bracelet' },
  { id: 7, name: 'Luxury Watch', price: '450', imageUrl: 'https://picsum.photos/seed/watch_feed/500/500', imageHint: 'luxury watch' },
  { id: 8, name: 'Classic Handbag', price: '220', imageUrl: 'https://picsum.photos/seed/handbag/500/500', imageHint: 'classic handbag' },
];

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd check a token, session, or make an API call.
    // We'll simulate this by checking sessionStorage.
    const authStatus = sessionStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
        <div className="container mx-auto px-4 py-4">
             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
             </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className='space-y-1'>
            <h1 className="text-3xl font-bold tracking-tight">For You</h1>
            <p className="text-muted-foreground">Products we think you'll love.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
