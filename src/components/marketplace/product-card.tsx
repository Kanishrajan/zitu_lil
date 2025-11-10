
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingCart, Gavel } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  imageHint?: string;
  isAuction?: boolean;
};

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const isOffer = product.price === 'Offer';
  
  if (product.isAuction) {
    return (
      <Card className="overflow-hidden border-none bg-transparent shadow-none">
        <CardContent className="p-0 space-y-2">
          <Link href={`/bidding/${product.id}`} className="block">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
                data-ai-hint={product.imageHint || 'product photo'}
              />
            </div>
          </Link>
          <div className="pt-1">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="text-xs text-muted-foreground">
              {isOffer ? 'Accepting Offers' : `Starting at $${product.price}`}
            </p>
          </div>
          <Button asChild variant={'outline'} className="w-full h-9 text-sm">
            <Link href={`/bidding/${product.id}`}>
              <Gavel className="mr-2 h-4 w-4" />
              Place Bid
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const buttonContent = isOffer ? 'Negotiate' : 'Add to Cart';

  return (
      <Card className="overflow-hidden border-none bg-transparent shadow-none">
        <CardContent className="p-0 space-y-2">
          <Link href={`/bidding/${product.id}`} className="block">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
                data-ai-hint={product.imageHint || 'product photo'}
              />
            </div>
          </Link>
          <div className="pt-1">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="text-xs text-muted-foreground">
              {isOffer ? 'Accepting Offers' : `Starts at $${product.price}`}
            </p>
          </div>
          <Button asChild variant={isOffer ? 'secondary' : 'default'} className="w-full h-9 text-sm">
            <Link href={isOffer ? `/messages/${product.id}` : '#'}>
              {isOffer ? buttonContent : <><ShoppingCart className="mr-2 h-4 w-4" /> {buttonContent}</>}
            </Link>
          </Button>
        </CardContent>
      </Card>
  );
}
