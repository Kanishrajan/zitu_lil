import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src={business.imageUrl}
            width={600}
            height={400}
            alt={business.name}
            className="object-cover"
            data-ai-hint={business.imageHint || "business storefront"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{business.name}</CardTitle>
            {business.isTrending && <Badge>Trending</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">{business.category} &middot; {business.region}</p>
      </CardContent>
    </Card>
  );
}
