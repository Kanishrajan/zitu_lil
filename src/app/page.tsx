
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostCard } from '@/components/feed/post-card';
import { Skeleton } from '@/components/ui/skeleton';


const posts = [
  {
    id: 1,
    username: 'IKEA',
    avatarUrl: 'https://picsum.photos/seed/ikea/100/100',
    imageUrl: 'https://picsum.photos/seed/livingroom/600/800',
    caption: 'Our new collection of minimalist furniture is here to bring peace to your space. ✨',
    likes: 1345,
    comments: 112,
    imageHint: 'minimalist living room'
  },
  {
    id: 2,
    username: 'UrbanLadder',
    avatarUrl: 'https://picsum.photos/seed/urban/100/100',
    imageUrl: 'https://picsum.photos/seed/plants/600/700',
    caption: 'Bringing the outdoors in. Find the perfect plant for your home in our marketplace! 🌿',
    likes: 2109,
    comments: 245,
    imageHint: 'house plants'
  },
  {
    id: 3,
    username: 'Pepperfry',
    avatarUrl: 'https://picsum.photos/seed/pepperfry/100/100',
    imageUrl: 'https://picsum.photos/seed/bedroom/600/750',
    caption: 'Handcrafted beds and decor for your dream bedroom. #homedecor #interiordesign',
    likes: 987,
    comments: 76,
    imageHint: 'cozy bedroom'
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
