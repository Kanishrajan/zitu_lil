import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Business = {
  id: number;
  name: string;
  category: string;
  region: string;
  imageUrl: string;
  isTrending: boolean;
  imageHint?: string;
};

type BusinessCardProps = {
  business: Business;
};

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-none rounded-lg group">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={business.imageUrl}
            width={600}
            height={400}
            alt={business.name}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={business.imageHint || "business storefront"}
          />
           {business.isTrending && <Badge className="absolute top-3 right-3">Trending</Badge>}
        </div>
      <CardContent className="p-0 pt-4 space-y-1">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{business.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{business.category} &middot; {business.region}</p>
      </CardContent>
    </Card>
  );
}
