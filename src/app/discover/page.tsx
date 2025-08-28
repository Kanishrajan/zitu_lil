
import { Search } from 'lucide-react';
import { BusinessCard } from '@/components/discover/business-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const businesses = [
  { id: 1, name: 'Fossil', category: 'Watches', region: 'Global', imageUrl: 'https://picsum.photos/seed/fossilwatch/600/400', isTrending: true, imageHint: 'fossil watch' },
  { id: 2, name: 'Gucci', category: 'Handbags', region: 'Milan', imageUrl: 'https://picsum.photos/seed/guccibag/600/400', isTrending: false, imageHint: 'leather handbag' },
  { id: 3, name: 'Ray-Ban', category: 'Sunglasses', region: 'Italy', imageUrl: 'https://picsum.photos/seed/sunnies/600/400', isTrending: true, imageHint: 'stylish sunglasses' },
  { id: 4, name: 'Tumi', category: 'Bags', region: 'Online', imageUrl: 'https://picsum.photos/seed/tumibackpack/600/400', isTrending: false, imageHint: 'luxury backpack' },
  { id: 5, name: 'Swarovski', category: 'Jewelry', region: 'Austria', imageUrl: 'https://picsum.photos/seed/jewelry/600/400', isTrending: false, imageHint: 'crystal necklace' },
  { id: 6, name: 'Bose', category: 'Headphones', region: 'USA', imageUrl: 'https://picsum.photos/seed/headphones/600/400', isTrending: true, imageHint: 'noise cancelling headphones' },
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
          <Input placeholder="Search watches, jewelry, brands..." className="w-full pl-10 h-12 rounded-full bg-secondary border-transparent focus:bg-background focus:border-border" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          <Button variant="secondary" className="rounded-full">Watches</Button>
          <Button variant="secondary" className="rounded-full">Jewelry</Button>
          <Button variant="secondary" className="rounded-full">Handbags</Button>
          <Button variant="secondary" className="rounded-full">Sunglasses</Button>
          <Button variant="secondary" className="rounded-full">Headphones</Button>
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
