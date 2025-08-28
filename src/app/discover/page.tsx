import { Search } from 'lucide-react';
import { BusinessCard } from '@/components/discover/business-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const businesses = [
  { id: 1, name: 'Urban Eatery', category: 'Restaurant', region: 'Downtown', imageUrl: 'https://picsum.photos/seed/restaurant/600/400', isTrending: true, imageHint: 'modern restaurant' },
  { id: 2, name: 'Vintage Threads', category: 'Fashion', region: 'Arts District', imageUrl: 'https://picsum.photos/seed/fashion/600/400', isTrending: false, imageHint: 'clothing boutique' },
  { id: 3, name: 'Code & Coffee', category: 'Cafe', region: 'Tech Hub', imageUrl: 'https://picsum.photos/seed/cafe/600/400', isTrending: true, imageHint: 'coffee shop' },
  { id: 4, name: 'Iron Gym', category: 'Fitness', region: 'Uptown', imageUrl: 'https://picsum.photos/seed/gym/600/400', isTrending: false, imageHint: 'modern gym' },
  { id: 5, name: 'The Book Nook', category: 'Bookstore', region: 'Downtown', imageUrl: 'https://picsum.photos/seed/books/600/400', isTrending: false, imageHint: 'cozy bookstore' },
  { id: 6, name: 'Pixel Perfect', category: 'Design Agency', region: 'Arts District', imageUrl: 'https://picsum.photos/seed/design/600/400', isTrending: true, imageHint: 'design agency' },
];

export default function DiscoverPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Discover</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search businesses..." className="w-full pl-10 h-12" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          <Button variant="secondary">Category</Button>
          <Button variant="secondary">Region</Button>
          <Button variant="secondary">Trending</Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((biz) => (
            <BusinessCard key={biz.id} business={biz} />
          ))}
        </div>
      </div>
    </div>
  );
}
