
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostCard } from '@/components/feed/post-card';
import { Skeleton } from '@/components/ui/skeleton';


const posts = [
  {
    id: 1,
    username: 'JewelryGems',
    avatarUrl: 'https://picsum.photos/seed/jewelry/100/100',
    imageUrl: 'https://picsum.photos/seed/necklace_feed/600/800',
    caption: 'Adorn yourself with elegance. Our new collection of silver necklaces is here.',
    likes: 1345,
    comments: 112,
    imageHint: 'silver necklace'
  },
  {
    id: 2,
    username: 'Ray-Ban',
    avatarUrl: 'https://picsum.photos/seed/rayban/100/100',
    imageUrl: 'https://picsum.photos/seed/sunglasses_feed/600/700',
    caption: 'You can\'t go wrong with a classic. The iconic Aviator, available now. #sunglasses',
    likes: 2109,
    comments: 245,
    imageHint: 'classic sunglasses'
  },
  {
    id: 3,
    username: 'FashionFinds',
    avatarUrl: 'https://picsum.photos/seed/fashion/100/100',
    imageUrl: 'https://picsum.photos/seed/scarf_feed/600/750',
    caption: 'Wrap yourself in luxury. Our new silk scarves are perfect for any occasion.',
    likes: 987,
    comments: 76,
    imageHint: 'silk scarf'
  },
];

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd check a token, session, or make an API call.
    // We'll simulate this by checking sessionStorage.
    const authStatus = sessionStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
        <div className="container mx-auto max-w-2xl px-0 sm:px-4 py-4">
            <div className="space-y-6">
                <Skeleton className="h-[700px] w-full" />
                <Skeleton className="h-[700px] w-full" />
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-0 sm:px-4 py-4">
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
