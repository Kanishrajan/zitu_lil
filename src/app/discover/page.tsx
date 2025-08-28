
import { ProductCard } from '@/components/marketplace/product-card';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const products = [
  { id: 1, name: 'Minimalist Watch', price: '250', imageUrl: 'https://picsum.photos/seed/watch/500/500', imageHint: 'elegant watch' },
  { id: 2, name: 'Leather Backpack', price: '120', imageUrl: 'https://picsum.photos/seed/backpack/500/500', imageHint: 'leather backpack' },
  { id: 3, name: 'Wireless Earbuds', price: '99', imageUrl: 'https://picsum.photos/seed/earbuds/500/500', imageHint: 'wireless earbuds' },
  { id: 4, name: 'Handmade Ceramic Mug', price: 'Offer', imageUrl: 'https://picsum.photos/seed/mug/500/500', imageHint: 'ceramic mug' },
  { id: 5, name: 'Designer Sunglasses', price: '180', imageUrl: 'https://picsum.photos/seed/sunglasses/500/500', imageHint: 'stylish sunglasses' },
  { id: 6, name: 'Artisanal Coffee Beans', price: '25', imageUrl: 'https://picsum.photos/seed/coffeebeans/500/500', imageHint: 'coffee beans' },
];

export default function DiscoverPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="space-y-8">
        <div className='space-y-2'>
            <h1 className="text-4xl font-bold tracking-tighter">Discover Products</h1>
            <p className="text-muted-foreground">Browse our curated selection of quality items.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for products..." className="w-full pl-10 h-12 rounded-full bg-secondary border-transparent focus:bg-background focus:border-border" />
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
