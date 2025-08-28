import Image from 'next/image';
import { Heart, MessageCircle, MoreHorizontal, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

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
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden border-none bg-background shadow-none sm:border sm:bg-card sm:shadow-sm">
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
        <div className="relative aspect-square w-full sm:aspect-auto sm:h-[600px]">
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt="Post content"
              fill
              className="object-cover"
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
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Heart className="h-6 w-6" />
              <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MessageCircle className="h-6 w-6" />
              <span className="sr-only">Comment</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Send className="h-6 w-6" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
        <p className="font-semibold text-sm">{post.likes.toLocaleString()} likes</p>
        <p className="text-sm">
          <span className="font-semibold">{post.username}</span>{' '}
          {post.caption}
        </p>
        <p className="text-sm text-muted-foreground">
          View all {post.comments.toLocaleString()} comments
        </p>
      </CardFooter>
    </Card>
  );
}
