
'use client';

import { PostCard } from '@/components/feed/post-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Send } from 'lucide-react';

// Mock data, in a real app you would fetch this based on the [id]
const posts = [
  {
    id: 1,
    username: 'minimal_living',
    avatarUrl: 'https://picsum.photos/id/10/100/100',
    imageUrl: 'https://picsum.photos/seed/livingroom/600/800',
    caption: 'Our new collection of minimalist furniture is here to bring peace to your space. ✨',
    likes: 1345,
    comments: 112,
    imageHint: 'minimalist living room'
  },
  {
    id: 2,
    username: 'urban_oasis',
    avatarUrl: 'https://picsum.photos/id/11/100/100',
    imageUrl: 'https://picsum.photos/seed/plants/600/700',
    caption: 'Bringing the outdoors in. Find the perfect plant for your home in our marketplace! 🌿',
    likes: 2109,
    comments: 245,
    imageHint: 'house plants'
  },
  {
    id: 3,
    username: 'cozy_corners',
    avatarUrl: 'https://picsum.photos/id/12/100/100',
    imageUrl: 'https://picsum.photos/seed/bedroom/600/750',
    caption: 'Handcrafted beds and decor for your dream bedroom. #homedecor #interiordesign',
    likes: 987,
    comments: 76,
    imageHint: 'cozy bedroom'
  },
];

const commentsData = [
    { id: 1, username: 'design_lover', avatarUrl: 'https://picsum.photos/id/15/100/100', text: 'Absolutely stunning! Where can I get that chair?' },
    { id: 2, username: 'zitu_user', avatarUrl: 'https://picsum.photos/id/237/100/100', text: 'Love this aesthetic. So clean and calming.' },
    { id: 3, username: 'homebody', avatarUrl: 'https://picsum.photos/id/18/100/100', text: 'This is my dream living room! 😍' },
];

function Comment({ comment }: { comment: typeof commentsData[0] }) {
    return (
        <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
                <AvatarImage src={comment.avatarUrl} alt={`@${comment.username}`} />
                <AvatarFallback>{comment.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-sm">
                <p>
                    <span className="font-semibold">{comment.username}</span>{' '}
                    {comment.text}
                </p>
            </div>
        </div>
    )
}

export default function PostPage({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id.toString() === params.id);

  if (!post) {
    return <div className="container mx-auto max-w-2xl px-4 py-4 text-center">Post not found.</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl px-0 sm:px-4 py-4">
      <div className='sm:border sm:rounded-lg sm:bg-card sm:shadow-sm'>
        <PostCard post={post} isCommentPage={true} />
        <Separator />
        <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Comments</h2>
            <div className="space-y-4">
                {commentsData.map(comment => <Comment key={comment.id} comment={comment} />)}
            </div>
        </div>
        <Separator />
        <div className="p-4 flex items-center gap-2">
            <Input placeholder="Add a comment..." className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0" />
            <Button variant="ghost" size="icon">
                <Send className="h-5 w-5" />
                <span className="sr-only">Post Comment</span>
            </Button>
        </div>
      </div>
    </div>
  );
}
