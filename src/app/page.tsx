
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductCard } from '@/components/marketplace/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';


const forYouProducts = [
  { id: 1, name: 'Basmati Rice (1 Ton)', price: '950', imageUrl: 'https://picsum.photos/seed/rice/500/500', imageHint: 'sack of rice' },
  { id: 2, name: 'Whole Wheat (1 Ton)', price: '450', imageUrl: 'https://picsum.photos/seed/wheat/500/500', imageHint: 'field of wheat' },
  { id: 3, name: 'Refined Sugar (1 Ton)', price: '800', imageUrl: 'https://picsum.photos/seed/sugar/500/500', imageHint: 'pile of sugar' },
  { id: 4, name: 'Yellow Lentils (1 Ton)', price: 'Offer', imageUrl: 'https://picsum.photos/seed/lentils/500/500', imageHint: 'bag of lentils' },
];

const nearbyProducts = [
  { id: 5, name: 'Industrial Salt (1 Ton)', price: '300', imageUrl: 'https://picsum.photos/seed/salt/500/500', imageHint: 'pile of salt' },
  { id: 6, name: 'Corn Grits (1 Ton)', price: '400', imageUrl: 'https://picsum.photos/seed/corn/500/500', imageHint: 'corn grits' },
  { id: 7, name: 'Soyabean Meal (1 Ton)', price: '550', imageUrl: 'https://picsum.photos/seed/soybean/500/500', imageHint: 'soybean meal' },
  { id: 8, name: 'Organic Honey (500L)', price: '2200', imageUrl: 'https://picsum.photos/seed/honey/500/500', imageHint: 'jar of honey' },
]

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // In a real app, this would be a proper auth check
    const authStatus = sessionStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      router.push('/login');
    }
  }, [router]);


  if (isAuthenticated === null) {
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

  if (isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-4">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className='space-y-1'>
              <h1 className="text-3xl font-bold tracking-tight">For You</h1>
              <p className="text-muted-foreground">Wholesale products we think you'll love.</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {forYouProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
           <div className="space-y-6">
            <div className='space-y-1'>
              <h1 className="text-3xl font-bold tracking-tight">Near You</h1>
              <p className="text-muted-foreground">Products from sellers in your area.</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {nearbyProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
