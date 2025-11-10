
import { ProductCard } from '@/components/marketplace/product-card';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const products = [
  { id: 1, name: 'Basmati Rice (1 Ton)', price: '950', imageUrl: 'https://picsum.photos/seed/rice/500/500', imageHint: 'sack of rice' },
  { id: 2, name: 'Whole Wheat (1 Ton)', price: '450', imageUrl: 'https://picsum.photos/seed/wheat/500/500', imageHint: 'field of wheat' },
  { id: 3, name: 'Refined Sugar (1 Ton)', price: '800', imageUrl: 'https://picsum.photos/seed/sugar/500/500', imageHint: 'pile of sugar' },
  { id: 4, name: 'Yellow Lentils (1 Ton)', price: 'Offer', imageUrl: 'https://picsum.photos/seed/lentils/500/500', imageHint: 'bag of lentils' },
  { id: 5, name: 'Industrial Salt (1 Ton)', price: '300', imageUrl: 'https://picsum.photos/seed/salt/500/500', imageHint: 'pile of salt' },
  { id: 6, name: 'Corn Grits (1 Ton)', price: '400', imageUrl: 'https://picsum.photos/seed/corn/500/500', imageHint: 'corn grits' },
];

export default function DiscoverPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="space-y-8">
        <div className='space-y-2'>
            <h1 className="text-4xl font-bold tracking-tighter">Discover Raw Materials</h1>
            <p className="text-muted-foreground">Browse our curated selection of wholesale goods.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for raw materials..." className="w-full pl-10 h-12 rounded-full bg-secondary border-transparent focus:bg-background focus:border-border" />
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
