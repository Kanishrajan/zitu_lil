
'use client';

import Image from 'next/image';
import { Heart, MessageCircle, MoreHorizontal, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Post = {
  id: number;
  username: string;
  avatarUrl: string;
  imageUrl?: string;
  videoUrl?: string;
  caption: string;
  likes: number;
  comments: number;
  imageHint?: string;
};

type PostCardProps = {
  post: Post;
  isCommentPage?: boolean;
};

export function PostCard({ post, isCommentPage = false }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  };


  return (
    <Card className={cn(
        "overflow-hidden border-none bg-background shadow-none",
        !isCommentPage && "sm:border sm:bg-card sm:shadow-sm"
    )}>
      <CardHeader className="flex flex-row items-center gap-3 p-3 sm:p-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src={post.avatarUrl} alt={`@${post.username}`} />
          <AvatarFallback>{post.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{post.username}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-5 w-5" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className={cn(
            "relative w-full",
            isCommentPage ? "aspect-auto" : "aspect-square sm:aspect-auto sm:h-[600px]"
        )}>
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt="Post content"
              width={600}
              height={800}
              className={cn(
                  "object-cover w-full",
                  isCommentPage ? "h-auto" : "h-full"
              )}
              data-ai-hint={post.imageHint || "social media post"}
            />
          )}
          {post.videoUrl && (
            <video
              src={post.videoUrl}
              controls
              className="h-full w-full object-cover"
              aria-label="Post video"
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-3 sm:p-4">
        <div className="flex w-full items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleLike}>
              <Heart 
                className={cn(
                    "h-6 w-6 transition-all duration-200", 
                    isLiked ? 'text-red-500 fill-current' : 'text-foreground'
                )} 
              />
              <span className="sr-only">Like</span>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-9 w-9">
              <Link href={`/post/${post.id}`}>
                <MessageCircle className="h-6 w-6" />
                <span className="sr-only">Comment</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Send className="h-6 w-6" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
        <p className="font-semibold text-sm">{likeCount.toLocaleString()} likes</p>
        <p className="text-sm">
          <span className="font-semibold">{post.username}</span>{' '}
          {post.caption}
        </p>
        {!isCommentPage && (
             <Link href={`/post/${post.id}`} className="text-sm text-muted-foreground">
                View all {post.comments.toLocaleString()} comments
             </Link>
        )}
      </CardFooter>
    </Card>
  );
}
