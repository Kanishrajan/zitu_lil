
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeaderboardCard, LeaderboardUser } from '@/components/leaderboard/leaderboard-card';
import { Globe, Map, Pin } from 'lucide-react';
import Link from 'next/link';

const globalUsers: LeaderboardUser[] = [
  { id: 1, rank: 1, name: 'Eco Furnish', avatarUrl: 'https://picsum.photos/id/101/200', points: 12550, sold: 120, won: 15, region: 'India', tier: 'Diamond', progress: 78 },
  { id: 2, rank: 2, name: 'Modern Minimalist', avatarUrl: 'https://picsum.photos/id/102/200', points: 11800, sold: 110, won: 22, region: 'USA', tier: 'Diamond', progress: 45 },
  { id: 3, rank: 3, name: 'Vintage Vibes', avatarUrl: 'https://picsum.photos/id/103/200', points: 10500, sold: 95, won: 30, region: 'UK', tier: 'Gold', progress: 91 },
  { id: 4, rank: 4, name: 'Artisan Finds', avatarUrl: 'https://picsum.photos/id/1025/200', points: 9800, sold: 90, won: 18, region: 'Brazil', tier: 'Gold', progress: 65 },
  { id: 5, rank: 5, name: 'ZITU User', avatarUrl: 'https://picsum.photos/id/237/200', points: 9500, sold: 85, won: 25, region: 'India', tier: 'Gold', progress: 55 },
  { id: 6, rank: 6, name: 'Boho Boutique', avatarUrl: 'https://picsum.photos/id/105/200', points: 8200, sold: 75, won: 19, region: 'Australia', tier: 'Silver', progress: 88 },
];

const regionalUsers: LeaderboardUser[] = [
  { id: 1, rank: 1, name: 'Eco Furnish', avatarUrl: 'https://picsum.photos/id/101/200', points: 12550, sold: 120, won: 15, region: 'Mumbai', tier: 'Diamond', progress: 78 },
  { id: 5, rank: 2, name: 'ZITU User', avatarUrl: 'https://picsum.photos/id/237/200', points: 9500, sold: 85, won: 25, region: 'Delhi', tier: 'Gold', progress: 55 },
  { id: 7, rank: 3, name: 'Craft Corner', avatarUrl: 'https://picsum.photos/id/107/200', points: 8900, sold: 80, won: 20, region: 'Bangalore', tier: 'Silver', progress: 95 },
  { id: 8, rank: 4, name: 'The Decor Co.', avatarUrl: 'https://picsum.photos/id/108/200', points: 7600, sold: 70, won: 15, region: 'Chennai', tier: 'Silver', progress: 40 },
];

// Assuming current user is in Delhi
const localUsers: LeaderboardUser[] = [
  { id: 5, rank: 1, name: 'ZITU User', avatarUrl: 'https://picsum.photos/id/237/200', points: 9500, sold: 85, won: 25, region: 'Delhi', tier: 'Gold', progress: 55 },
  { id: 9, rank: 2, name: 'Urban Living', avatarUrl: 'https://picsum.photos/id/109/200', points: 8100, sold: 72, won: 28, region: 'Delhi', tier: 'Silver', progress: 75 },
  { id: 10, rank: 3, name: 'Home Essentials', avatarUrl: 'https://picsum.photos/id/110/200', points: 7800, sold: 68, won: 24, region: 'Gurgaon', tier: 'Silver', progress: 50 },
];

function LeaderboardList({ users }: { users: LeaderboardUser[] }) {
    // Assuming ZITU User with id 5 is the current user
    const currentUserId = 5;
    return (
        <div className="space-y-3">
            {users.map(user => (
                <Link key={user.id} href={`/profile/${user.id}`} legacyBehavior>
                    <a href={`/profile/${user.id}`}>
                        <LeaderboardCard user={user} isCurrentUser={user.id === currentUserId} />
                    </a>
                </Link>
            ))}
        </div>
    )
}

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-4">
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="global" className="gap-2">
                <Globe className="h-4 w-4" /> Global
            </TabsTrigger>
            <TabsTrigger value="regional" className="gap-2">
                <Map className="h-4 w-4" /> Regional
            </TabsTrigger>
            <TabsTrigger value="local" className="gap-2">
                <Pin className="h-4 w-4" /> Local
            </TabsTrigger>
          </TabsList>
          <TabsContent value="global">
            <LeaderboardList users={globalUsers} />
          </TabsContent>
          <TabsContent value="regional">
            <LeaderboardList users={regionalUsers} />
          </TabsContent>
          <TabsContent value="local">
            <LeaderboardList users={localUsers} />
          </TabsContent>
        </Tabs>
    </div>
  );
}
