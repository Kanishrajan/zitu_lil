
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Award, BadgeCheck, Globe, Map, Pin, ShoppingCart, UserPlus, UserCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/marketplace/product-card';

// Mock data, in a real app you would fetch this based on the [id]
const userProfile = {
  id: 1,
  name: 'Eco Furnish',
  type: 'Furniture Company',
  location: 'India',
  avatarUrl: 'https://picsum.photos/id/101/200',
  bio: 'Sustainable and stylish furniture for the modern home. We believe in quality craftsmanship and eco-friendly materials.',
  points: 12550,
  productsSold: 120,
  ranking: {
    world: 1,
    region: 1,
    local: 1,
  },
  products: [
    { id: 1, name: 'Minimalist Watch', price: '250', imageUrl: 'https://picsum.photos/seed/watch/500/500', imageHint: 'elegant watch' },
    { id: 2, name: 'Leather Backpack', price: '120', imageUrl: 'https://picsum.photos/seed/backpack/500/500', imageHint: 'leather backpack' },
    { id: 3, name: 'Wireless Earbuds', price: '99', imageUrl: 'https://picsum.photos/seed/earbuds/500/500', imageHint: 'wireless earbuds' },
    { id: 4, name: 'Handmade Ceramic Mug', price: 'Offer', imageUrl: 'https://picsum.photos/seed/mug/500/500', imageHint: 'ceramic mug' },
  ]
};

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) {
  return (
    <Card className="flex-1 bg-secondary/50 border-none shadow-sm">
      <CardContent className="p-3 flex flex-col items-center justify-center text-center gap-1">
        <Icon className="h-6 w-6 text-primary" />
        <p className="text-xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <header className="flex items-center justify-center relative py-4">
        <Button onClick={() => router.back()} variant="ghost" size="icon" className="absolute left-0">
          <ArrowLeft />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-xl font-bold tracking-tight">{userProfile.name}</h1>
      </header>

      <main className="space-y-8 mt-4">
        {/* Profile Header */}
        <section className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-28 w-28 border-4 border-primary shadow-lg">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{userProfile.name}</h2>
            <p className="text-muted-foreground">{userProfile.type}</p>
            <p className="text-sm text-muted-foreground">{userProfile.location}</p>
          </div>
          <Button 
            onClick={() => setIsFollowing(!isFollowing)}
            variant={isFollowing ? 'secondary' : 'default'}
            className="w-40 transition-all"
          >
            {isFollowing ? <UserCheck className="mr-2" /> : <UserPlus className="mr-2" />}
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </section>

        {/* Stats Section */}
        <section className="flex gap-3 justify-center">
            <StatCard icon={Award} label="Points" value={userProfile.points.toLocaleString()} />
            <StatCard icon={ShoppingCart} label="Sold" value={userProfile.productsSold} />
            <StatCard icon={BadgeCheck} label="World Rank" value={`#${userProfile.ranking.world}`} />
        </section>

        {/* Bio Section */}
        <section>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm text-muted-foreground">{userProfile.bio}</p>
            </CardContent>
          </Card>
        </section>

        {/* Products Section */}
        <section className="space-y-4">
            <h3 className="text-xl font-bold">Products</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {userProfile.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
        </section>

      </main>
    </div>
  );
}
