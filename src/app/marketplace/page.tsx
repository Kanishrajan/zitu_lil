
import Link from 'next/link';
import { ProductCard } from '@/components/marketplace/product-card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const products = [
  { id: 1, name: 'Basmati Rice (1 Ton)', price: '950', imageUrl: 'https://picsum.photos/seed/rice/500/500', imageHint: 'sack of rice' },
  { id: 2, name: 'Whole Wheat (1 Ton)', price: '450', imageUrl: 'https://picsum.photos/seed/wheat/500/500', imageHint: 'field of wheat' },
  { id: 3, name: 'Refined Sugar (1 Ton)', price: '800', imageUrl: 'https://picsum.photos/seed/sugar/500/500', imageHint: 'pile of sugar' },
  { id: 4, name: 'Yellow Lentils (1 Ton)', price: 'Offer', imageUrl: 'https://picsum.photos/seed/lentils/500/500', imageHint: 'bag of lentils' },
  { id: 5, name: 'Industrial Salt (1 Ton)', price: '300', imageUrl: 'https://picsum.photos/seed/salt/500/500', imageHint: 'pile of salt' },
  { id: 6, name: 'Corn Grits (1 Ton)', price: '400', imageUrl: 'https://picsum.photos/seed/corn/500/500', imageHint: 'corn grits' },
];

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <Button asChild>
            <Link href="/marketplace/list-item">
              <PlusCircle className="mr-2 h-4 w-4" />
              List Item
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
