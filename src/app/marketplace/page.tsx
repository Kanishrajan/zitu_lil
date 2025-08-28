import Link from 'next/link';
import { ProductCard } from '@/components/marketplace/product-card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const products = [
  { id: 1, name: 'Minimalist Watch', price: '250', imageUrl: 'https://picsum.photos/seed/watch/500/500', imageHint: 'elegant watch' },
  { id: 2, name: 'Leather Backpack', price: '120', imageUrl: 'https://picsum.photos/seed/backpack/500/500', imageHint: 'leather backpack' },
  { id: 3, name: 'Wireless Earbuds', price: '99', imageUrl: 'https://picsum.photos/seed/earbuds/500/500', imageHint: 'wireless earbuds' },
  { id: 4, name: 'Handmade Ceramic Mug', price: 'Offer', imageUrl: 'https://picsum.photos/seed/mug/500/500', imageHint: 'ceramic mug' },
  { id: 5, name: 'Designer Sunglasses', price: '180', imageUrl: 'https://picsum.photos/seed/sunglasses/500/500', imageHint: 'stylish sunglasses' },
  { id: 6, name: 'Artisanal Coffee Beans', price: '25', imageUrl: 'https://picsum.photos/seed/coffeebeans/500/500', imageHint: 'coffee beans' },
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
