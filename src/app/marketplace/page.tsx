
import Link from 'next/link';
import { ProductCard } from '@/components/marketplace/product-card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const products = [
  { id: 1, name: 'Silver-Plated Necklace', price: '150', imageUrl: 'https://picsum.photos/seed/necklace/500/500', imageHint: 'silver necklace' },
  { id: 2, name: 'Silk Scarf', price: '80', imageUrl: 'https://picsum.photos/seed/scarf/500/500', imageHint: 'silk scarf' },
  { id: 3, name: 'Gold-Plated Earrings', price: '120', imageUrl: 'https://picsum.photos/seed/earrings/500/500', imageHint: 'gold earrings' },
  { id: 4, name: 'Leather Wallet', price: 'Offer', imageUrl: 'https://picsum.photos/seed/wallet/500/500', imageHint: 'leather wallet' },
  { id: 5, name: 'Designer Sunglasses', price: '180', imageUrl: 'https://picsum.photos/seed/sunglasses/500/500', imageHint: 'stylish sunglasses' },
  { id: 6, name: 'Beaded Bracelet', price: '45', imageUrl: 'https://picsum.photos/seed/bracelet/500/500', imageHint: 'beaded bracelet' },
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
