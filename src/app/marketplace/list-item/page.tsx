
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ImageUp, Loader2, Sparkles, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { suggestProductInfo } from '@/ai/flows/suggest-product-info-flow';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) || val.toLowerCase() === 'offer', {
    message: "Price must be a number or 'offer'.",
  }),
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  image: z.any().refine((file) => file instanceof File, 'Image is required.'),
});

// Helper to convert file to data URI
const toDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export default function ListItemPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      location: '',
    },
  });

  const handleGenerate = async () => {
      const name = form.getValues('name');
      const imageFile = form.getValues('image');

      if (!name || !imageFile) {
          toast({
              title: 'Name and Image Required',
              description: 'Please provide a product name and image to generate details.',
              variant: 'destructive',
          });
          return;
      }

      setIsGenerating(true);
      try {
          const imageDataUri = await toDataUri(imageFile);
          const result = await suggestProductInfo({
              productName: name,
              photoDataUri: imageDataUri,
          });

          if (result.description) {
              form.setValue('description', result.description, { shouldValidate: true });
          }
          if (result.suggestedPrice) {
              form.setValue('price', result.suggestedPrice.toString(), { shouldValidate: true });
          }

          toast({
              title: 'AI Suggestions Applied!',
              description: 'The description and price have been filled in for you.',
          });

      } catch (error) {
          console.error('Error generating product info:', error);
          toast({
              title: 'AI Generation Failed',
              description: 'There was an error generating suggestions. Please try again.',
              variant: 'destructive',
          });
      } finally {
          setIsGenerating(false);
      }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Here you would typically handle the form submission, e.g., upload the image and save the product data.
    // For this example, we'll just simulate a delay.
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(values);

    toast({
      title: 'Success!',
      description: 'Your item has been listed for sale.',
    });
    setIsSubmitting(false);
    router.push('/marketplace');
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">List a New Item</h1>
            <p className="text-muted-foreground">Fill out the details below to sell your item.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Basmati Rice (1 Ton)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl>
                        <div className="relative flex items-center justify-center w-full">
                            <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {form.watch('image') ? (
                                        <p className='text-sm text-muted-foreground'>{form.watch('image').name}</p>
                                    ) : (
                                        <>
                                            <ImageUp className="w-8 h-8 mb-4 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG, or GIF</p>
                                        </>
                                    )}
                                </div>
                                <Input id="image-upload" type="file" className="hidden" onChange={(e) => onChange(e.target.files?.[0])} accept="image/*" {...rest} />
                            </label>
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <FormLabel>Description (Caption)</FormLabel>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Generate with AI
                    </Button>
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="!mt-0">
                      <FormControl>
                        <Textarea
                          placeholder="Describe your product in detail..."
                          className="resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($) or "Offer"</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 950 or Offer" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a price in USD or type 'Offer' to accept negotiations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="e.g. Mumbai, India" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Listing Item...' : 'List Item'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
