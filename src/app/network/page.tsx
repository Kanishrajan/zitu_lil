import Image from 'next/image';
import { Grid3x3, Bookmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyState } from '@/components/layout/empty-state';

const user = {
  name: 'ZITU User',
  username: 'zitu_user',
  avatarUrl: 'https://picsum.photos/id/237/200/200',
  bio: 'Building the future of commerce & connection. Founder @ ZITU.',
  posts: 12,
  followers: 1250,
  following: 340,
};

const posts = [
  { id: 1, imageUrl: 'https://picsum.photos/seed/post1/500/500', imageHint: 'city skyline' },
  { id: 2, imageUrl: 'https://picsum.photos/seed/post2/500/500', imageHint: 'abstract art' },
  { id: 3, imageUrl: 'https://picsum.photos/seed/post3/500/500', imageHint: 'minimalist interior' },
  { id: 4, imageUrl: 'https://picsum.photos/seed/post4/500/500', imageHint: 'nature landscape' },
  { id: 5, imageUrl: 'https://picsum.photos/seed/post5/500/500', imageHint: 'street photography' },
  { id: 6, imageUrl: 'https://picsum.photos/seed/post6/500/500', imageHint: 'food photography' },
];

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <p className="font-bold text-lg">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export default function NetworkPage() {
  return (
    <div className="container mx-auto px-0 sm:px-4 py-4">
      <div className="space-y-6">
        <div className="px-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 grid grid-cols-3 gap-4">
              <Stat value={user.posts} label="Posts" />
              <Stat value={user.followers.toLocaleString()} label="Followers" />
              <Stat value={user.following} label="Following" />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h1 className="text-lg font-semibold">{user.name}</h1>
            <p className="text-sm">{user.bio}</p>
          </div>
          <div className="mt-4">
            <Button variant="secondary" className="w-full">Edit Profile</Button>
          </div>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card border-t border-b rounded-none">
            <TabsTrigger value="posts" className="bg-card rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              <Grid3x3 className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="saved" className="bg-card rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              <Bookmark className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-0">
            <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div key={post.id} className="relative aspect-square">
                  <Image src={post.imageUrl} alt="User post" fill className="object-cover" data-ai-hint={post.imageHint || "social media photo"} />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="saved" className="mt-0 h-96">
            <EmptyState 
              icon={Bookmark}
              title="No Saved Posts"
              description="Your saved posts from the feed and marketplace will appear here."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
