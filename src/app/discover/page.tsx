
import { ProductCard } from '@/components/marketplace/product-card';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const products = [
  { id: 1, name: 'Silver-Plated Necklace', price: '150', imageUrl: 'https://picsum.photos/seed/necklace/500/500', imageHint: 'silver necklace' },
  { id: 2, name: 'Silk Scarf', price: '80', imageUrl: 'https://picsum.photos/seed/scarf/500/500', imageHint: 'silk scarf' },
  { id: 3, name: 'Gold-Plated Earrings', price: '120', imageUrl: 'https://picsum.photos/seed/earrings/500/500', imageHint: 'gold earrings' },
  { id: 4, name: 'Leather Wallet', price: 'Offer', imageUrl: 'https://picsum.photos/seed/wallet/500/500', imageHint: 'leather wallet' },
  { id: 5, name: 'Designer Sunglasses', price: '180', imageUrl: 'https://picsum.photos/seed/sunglasses/500/500', imageHint: 'stylish sunglasses' },
  { id: 6, name: 'Beaded Bracelet', price: '45', imageUrl: 'https://picsum.photos/seed/bracelet/500/500', imageHint: 'beaded bracelet' },
];

export default function DiscoverPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="space-y-8">
        <div className='space-y-2'>
            <h1 className="text-4xl font-bold tracking-tighter">Discover Accessories</h1>
            <p className="text-muted-foreground">Browse our curated selection of stylish items.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for accessories..." className="w-full pl-10 h-12 rounded-full bg-secondary border-transparent focus:bg-background focus:border-border" />
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
