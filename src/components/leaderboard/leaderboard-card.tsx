
'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Crown, Gem, ShoppingCart, Award } from 'lucide-react';
import { cn } from '@/lib/utils';


export type LeaderboardUser = {
  id: number;
  rank: number;
  name: string;
  avatarUrl: string;
  points: number;
  sold: number;
  won: number;
  region: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
  progress: number;
};

type LeaderboardCardProps = {
  user: LeaderboardUser;
  isCurrentUser?: boolean;
};

const tierIcons = {
    'Bronze': <div className="w-2 h-2 rounded-full bg-[#cd7f32]"></div>,
    'Silver': <div className="w-2 h-2 rounded-full bg-[#c0c0c0]"></div>,
    'Gold': <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />,
    'Diamond': <Gem className="w-3 h-3 text-cyan-400 fill-cyan-400" />,
}

const rankColors = [
    "border-amber-400 text-amber-400", // 1st
    "border-slate-400 text-slate-400", // 2nd
    "border-amber-600 text-amber-600"  // 3rd
]


export function LeaderboardCard({ user, isCurrentUser = false }: LeaderboardCardProps) {
  const isTopThree = user.rank <= 3;

  return (
    <Card className={cn("transition-all", isCurrentUser && "border-primary ring-2 ring-primary")}>
        <CardContent className="p-4 flex items-center gap-4">
            <div className={cn(
                "flex items-center justify-center h-8 w-8 text-lg font-bold rounded-full border-2",
                isTopThree ? rankColors[user.rank - 1] : "border-muted-foreground/50"
            )}>
                {user.rank}
            </div>

            <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-grow space-y-1.5">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="font-bold text-lg text-primary">{user.points.toLocaleString()} pts</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <ShoppingCart className="w-3 h-3" />
                        <span>Sold: <strong>{user.sold}</strong></span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Award className="w-3 h-3" />
                        <span>Won: <strong>{user.won}</strong></span>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                           {tierIcons[user.tier]}
                           <span>{user.tier} Tier</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{user.progress}%</span>
                    </div>
                    <Progress value={user.progress} className="h-1.5" />
                </div>
            </div>

        </CardContent>
    </Card>
  );
}
