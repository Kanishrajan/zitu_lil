
import { ProductCard } from '@/components/marketplace/product-card';

const auctionProducts = [
  { id: 1, name: 'Silver-Plated Necklace', price: '150', imageUrl: 'https://picsum.photos/seed/necklace/500/500', imageHint: 'silver necklace', isAuction: true },
  { id: 2, name: 'Gold-Plated Earrings', price: '120', imageUrl: 'https://picsum.photos/seed/earrings/500/500', imageHint: 'gold earrings', isAuction: true },
  { id: 3, name: 'Diamond Ring', price: 'Offer', imageUrl: 'https://picsum.photos/seed/ring/500/500', imageHint: 'diamond ring', isAuction: true },
  { id: 7, name: 'Minimalist Watch', price: '250', imageUrl: 'https://picsum.photos/seed/watch/500/500', imageHint: 'elegant watch', isAuction: true },
];

export default function LiveAuctionsPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="space-y-6">
        <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Live Auctions</h1>
            <p className="text-muted-foreground">Place your bids on these exclusive items before time runs out.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {auctionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
