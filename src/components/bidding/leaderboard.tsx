
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';

type Bidder = {
  id: number;
  name: string;
  avatarUrl: string;
  bidAmount: number;
  isCurrentUser: boolean;
  timestamp: Date;
};

type BiddingLeaderboardProps = {
  bidders: Bidder[];
  isEnded?: boolean;
};

function formatTimeAgo(timestamp: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export function BiddingLeaderboard({ bidders, isEnded = false }: BiddingLeaderboardProps) {
    const sortedBidders = [...bidders].sort((a, b) => b.bidAmount - a.bidAmount);
    const topBidder = sortedBidders[0];

    return (
        <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="px-0">
                <CardTitle className="text-lg">Live Bids</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
                <ul className="space-y-3">
                    {sortedBidders.map((bidder, index) => (
                        <li
                            key={bidder.id}
                            className={cn(
                                "flex items-center gap-4 p-3 rounded-lg transition-all duration-300",
                                bidder.id === topBidder.id ? "bg-primary/10 border-primary/50 border" : "bg-card border",
                                bidder.isCurrentUser && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                                isEnded && bidder.id === topBidder.id && "bg-amber-400/20 border-amber-500"
                            )}
                        >
                            <span className="font-bold text-lg w-6 text-center">{index + 1}</span>
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={bidder.avatarUrl} alt={bidder.name} />
                                <AvatarFallback>{bidder.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <p className="font-semibold">{bidder.name}</p>
                                <p className="text-sm text-muted-foreground">{formatTimeAgo(bidder.timestamp)}</p>
                            </div>
                            <div className="text-right">
                                <p className={cn("font-bold text-lg", isEnded && bidder.id === topBidder.id ? "text-amber-500" : "text-primary")}>₹{bidder.bidAmount.toLocaleString('en-IN')}</p>
                                {bidder.id === topBidder.id && (
                                    <div className={cn(
                                        "flex items-center justify-end gap-1 text-xs",
                                        isEnded ? "text-amber-600 font-semibold" : "text-amber-500"
                                    )}>
                                        <Crown className="h-3 w-3 fill-current" />
                                        <span>{isEnded ? "Winner" : "Highest Bid"}</span>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
