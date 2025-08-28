
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostCard } from '@/components/feed/post-card';
import { Skeleton } from '@/components/ui/skeleton';


const posts = [
  {
    id: 1,
    username: 'Fossil',
    avatarUrl: 'https://picsum.photos/seed/fossil/100/100',
    imageUrl: 'https://picsum.photos/seed/watch_feed/600/800',
    caption: 'Timeless style meets modern innovation. Discover our new collection of smartwatches.',
    likes: 1345,
    comments: 112,
    imageHint: 'elegant watch'
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
    username: 'Gucci',
    avatarUrl: 'https://picsum.photos/seed/gucci/100/100',
    imageUrl: 'https://picsum.photos/seed/handbag/600/750',
    caption: 'Elegance in every detail. The new Marmont handbag collection has arrived.',
    likes: 987,
    comments: 76,
    imageHint: 'designer handbag'
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
