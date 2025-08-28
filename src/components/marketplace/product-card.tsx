import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
  return (
    <Card className="overflow-hidden border-none bg-transparent shadow-none">
      <CardContent className="p-0 space-y-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            data-ai-hint={product.imageHint || "product photo"}
          />
        </div>
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{isOffer ? 'Accepting Offers' : `$${product.price}`}</p>
        <Button variant={isOffer ? 'secondary' : 'default'} className="w-full h-9 text-sm">
          {isOffer ? 'Negotiate' : 'Place Bid'}
        </Button>
      </CardContent>
    </Card>
  );
}
