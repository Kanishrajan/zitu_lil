import { PostCard } from '@/components/feed/post-card';

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
