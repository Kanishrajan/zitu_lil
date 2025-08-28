
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostCard } from '@/components/feed/post-card';
import { Skeleton } from '@/components/ui/skeleton';


const posts = [
  {
    id: 1,
    username: 'zitu_official',
    avatarUrl: 'https://picsum.photos/id/10/100/100',
    imageUrl: 'https://picsum.photos/id/1015/600/400',
    caption: 'Welcome to ZITU! The new era of business networking and marketplace. 🚀',
    likes: 1204,
    comments: 89,
    imageHint: 'neon sign welcome'
  },
  {
    id: 2,
    username: 'creative_co',
    avatarUrl: 'https://picsum.photos/id/11/100/100',
    imageUrl: 'https://picsum.photos/id/1025/600/800',
    caption: 'Just launched our new collection. Check it out on the marketplace! #newlaunch #fashion',
    likes: 543,
    comments: 23,
    imageHint: 'clothing rack'
  },
  {
    id: 3,
    username: 'tech_trends',
    avatarUrl: 'https://picsum.photos/id/12/100/100',
    videoUrl: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_30fps.mp4',
    caption: 'The future of UI is here. Fluid, intuitive, and beautiful. #uidesign #tech',
    likes: 876,
    comments: 55,
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
