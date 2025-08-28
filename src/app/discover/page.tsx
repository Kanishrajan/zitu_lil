
import { Search } from 'lucide-react';
import { BusinessCard } from '@/components/discover/business-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const businesses = [
  { id: 1, name: 'IKEA', category: 'Furniture', region: 'Copenhagen', imageUrl: 'https://picsum.photos/seed/scandi/600/400', isTrending: true, imageHint: 'scandinavian furniture' },
  { id: 2, name: 'UrbanLadder', category: 'Decor', region: 'Byron Bay', imageUrl: 'https://picsum.photos/seed/boho/600/400', isTrending: false, imageHint: 'bohemian decor' },
  { id: 3, name: 'Pepperfry', category: 'Kitchenware', region: 'Milan', imageUrl: 'https://picsum.photos/seed/kitchen/600/400', isTrending: true, imageHint: 'modern kitchen' },
  { id: 4, name: 'Samsung', category: 'Electronics', region: 'Online', imageUrl: 'https://picsum.photos/seed/plantdecor/600/400', isTrending: false, imageHint: 'galaxy phone' },
  { id: 5, name: 'Apple Inc.', category: 'Electronics', region: 'Cupertino', imageUrl: 'https://picsum.photos/seed/textiles/600/400', isTrending: false, imageHint: 'apple iphone' },
  { id: 6, name: 'OnePlus', category: 'Electronics', region: 'Brooklyn', imageUrl: 'https://picsum.photos/seed/lighting/600/400', isTrending: true, imageHint: 'oneplus phone' },
];

export default function DiscoverPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="space-y-8">
        <div className='space-y-2'>
            <h1 className="text-4xl font-bold tracking-tighter">Discover</h1>
            <p className="text-muted-foreground">Find businesses that match your style.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search furniture, decor, brands..." className="w-full pl-10 h-12 rounded-full bg-secondary border-transparent focus:bg-background focus:border-border" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          <Button variant="secondary" className="rounded-full">Furniture</Button>
          <Button variant="secondary" className="rounded-full">Decor</Button>
          <Button variant="secondary" className="rounded-full">Lighting</Button>
          <Button variant="secondary" className="rounded-full">Kitchenware</Button>
          <Button variant="secondary" className="rounded-full">Textiles</Button>
          <Button variant="primary" className="rounded-full">Trending</Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((biz) => (
            <BusinessCard key={biz.id} business={biz} />
          ))}
        </div>
      </div>
    </div>
  );
}
